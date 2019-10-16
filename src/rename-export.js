import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

// -------------------------------------------------
// --------------- Dialog formatting ---------------
// -------------------------------------------------
function rect(x, y, w, h) {
  var rect = NSMakeRect(x, y, w, h)
  return rect;
}

function createLabel(frame, size, bold, text) {
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setBezeled(false);
  label.setDrawsBackground(false);
  label.setEditable(false);
  label.setSelectable(false);
  if (bold) {
    label.setFont(NSFont.boldSystemFontOfSize(size));
  }
  else {
    label.setFont(NSFont.systemFontOfSize(size));
  }
  return label;
}

function createTextbox({frame, size, bold, text, placeholder}) {
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setBezeled(true);
  label.setDrawsBackground(true);
  label.setEditable(true);
  label.setSelectable(true);
  label.placeholderString = placeholder
  if (bold) {
    label.setFont(NSFont.boldSystemFontOfSize(size));
  }
  else {
    label.setFont(NSFont.systemFontOfSize(size));
  }
  return label;
}

function createSelect(frame, items) {
  var select = NSPopUpButton.alloc().initWithFrame(frame);
  for (var i = 0; i < items.length; i++) {
    if (items[i] == "--") {
      select.menu().addItem(NSMenuItem.separatorItem())
    } else {
      select.addItemWithTitle(items[i])
    }
  }
  return select;
}

function createCheckbox(frame, name, value, onstate, enabled) {
  var checkbox = NSButton.alloc().initWithFrame(frame);
  checkbox.setButtonType(NSSwitchButton);
  // checkbox.setBezelStyle(1);
  checkbox.setTitle(name);
  checkbox.setTag(value);
  checkbox.setState(onstate ? NSOnState : NSOffState);
  checkbox.setEnabled(enabled);
  return checkbox;
}

// -------------------------------------------------
// ---------------- Text formatting ----------------
// -------------------------------------------------

function toSnake(str) {
  if (typeof str !== 'string') return ""
  return str.replace(/[\ \\\/\-\–\—]/g, '_').toLowerCase()
}

function toKebab(str) {
  if (typeof str !== 'string') return ""
  return str.replace(/[\ \\\/\_]/g, '-').toLowerCase()
}

function toCamel(str){
  if (typeof str !== 'string') return ""
  str = str.toLowerCase().split(/[\ \\\/\_\-\–\—]/g)
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join('');
}

// -------------------------------------------------
// ------------------- The Plugin ------------------
// -------------------------------------------------

export default function(context) {

  const doc = sketch.getSelectedDocument()
  const selection = doc.selectedLayers

  if (selection.length === 0) {
    sketch.UI.message('No layers are selected.')
  } else {
    // Create a custom dialog
    var dialog = NSAlert.alloc().init();

    dialog.setMessageText("Rename and Export");
    dialog.addButtonWithTitle("Continue");
    dialog.addButtonWithTitle("Cancel");

    // Create custom view and fields
    
    var dialogContents = [
      {
        type: 'label',
        id: 'caseLabel',
        value: 'Name format:',
        paddingBottom: -2
      },
      {
        type: 'select',
        id: 'selectCase',
        value: ['kebab-case', 'snake_case', 'camelCase'],
        paddingBottom: 8
      },
      {
        type: 'checkbox',
        id: 'fullName',
        label: 'Use full layer name',
        value: 'full-name',
        default: true,
        paddingBottom: 8
      },
      {
        type: 'label',
        id: 'prefixLabel',
        value: 'Name prefix:',
        paddingBottom: -2
      },
      {
        type: 'text',
        id: 'prefix',
        value: '',
        placeholder: 'Prefix',
        paddingBottom: 8
      },
      {
        type: 'label',
        id: 'fileFormat',
        value: 'File format:',
        paddingBottom: -2
      },
      {
        type: 'select',
        id: 'selectFormat',
        value: ['svg', 'png', 'jpg'],
        paddingBottom: 8
      },
    ]
    
    const numElements = dialogContents.length
    const elemHeight = 24;
    const totalPadding = dialogContents.map(elem => elem.paddingBottom).reduce((acc, pad) => acc + pad, 0)
    const totalHeight = numElements * (elemHeight) + totalPadding
    var customView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 200, totalHeight));
    var posOfNextElement = 24

    const viewContents = dialogContents.map((element, i) => {
      let type = element.type

      // let padding = (i === 0 || i === 1 || i === 4) ? 0 : element.paddingBottom
      let yPos = totalHeight - posOfNextElement // ((i+1) * (elemHeight))

      let UIElement; 

      if (type == 'label') {
        UIElement = createLabel(NSMakeRect(0, yPos, 200, elemHeight), 12, false, element.value);
      } else if (type == 'select') {
        UIElement = createSelect(NSMakeRect(0, yPos, 200, elemHeight), element.value)
      } else if (type == 'checkbox') {
        UIElement = createCheckbox(NSMakeRect(0, yPos, 200, elemHeight), element.label, element.value, element.default, true);
      } else if (type == 'text') {
        UIElement = createTextbox({
          frame: NSMakeRect(0, yPos, 200, elemHeight), 
          size: 12, 
          text: element.value,
          placeholder: element.placeholder
        })
      }

      posOfNextElement += elemHeight + element.paddingBottom

      return UIElement
    })

    viewContents.forEach(subview => {
      customView.addSubview(subview)
    })
    dialog.setAccessoryView(customView)

    // Run the dialog
    if (dialog.runModal() !== NSAlertFirstButtonReturn) {
      return
    } else {
      
      const caseElemIdx = dialogContents.findIndex(elem => elem.id === 'selectCase')
      const prefixElemIdx = dialogContents.findIndex(elem => elem.id === 'prefix')
      const fullNameElemIdx = dialogContents.findIndex(elem => elem.id === 'fullName')
      const formatElemIdx = dialogContents.findIndex(elem => elem.id === 'selectFormat')

      // Save the responses from that modal
      const caseIndex = viewContents[caseElemIdx].indexOfSelectedItem();
      const prefix = viewContents[prefixElemIdx].stringValue()
      const isFullName = viewContents[fullNameElemIdx].state();
      const formatIndex = viewContents[formatElemIdx].indexOfSelectedItem();

      // sketch.UI.message(`${caseIndex}, ${prefix}, ${isFullName}, ${formatIndex}`)
      
      // Create an Open dialog
      var open = NSOpenPanel.openPanel();
      open.canChooseFiles = false
      open.canChooseDirectories = true
      open.canCreateDirectories = true
  
      // run the open dialog
      if (open.runModal()) {
        var path = open.URL().path();
        const layers = selection.layers

        // Preserve the original layer names so we can change them back
        const originalLayerNames = layers.map(layer => layer.name)

        // Get the selected file format
        const fileFormat = dialogContents[formatElemIdx].value[formatIndex]

        // Change the file names appropriately
        layers.forEach(layer => {
          let newName = isFullName ? layer.name : layer.name.substring(layer.name.lastIndexOf('/') + 1, layer.name.length) 
          newName = !!prefix 
            ? `${prefix}-${newName}`
            : newName
          
          if (caseIndex === 0) {
            layer.name = toKebab(newName)
          }
          else if (caseIndex === 1) {
            layer.name = toSnake(newName)
          }
          else if (caseIndex === 2) {
            layer.name = toCamel(newName)
          }
        })

        // Set the format and save path
        const exportOptions = {
          formats: fileFormat,
          output: path
        }
        
        // Export the layers
        sketch.export(layers, exportOptions)
  
  
        // Reset the layer names
        layers.forEach((layer, i) => {
          layer.name = originalLayerNames[i]
        })
        // Show confirmation
        sketch.UI.message(`Exported ${layers.length} layers`)
      }
    }
  }
}