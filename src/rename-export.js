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

function createTextbox(frame, size, bold, text) {
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setBezeled(true);
  label.setDrawsBackground(true);
  label.setEditable(true);
  label.setSelectable(true);
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
        value: 'Filename format:'
      },
      {
        type: 'select',
        id: 'selectCase',
        value: ['kebab-case', 'snake_case', 'camelCase']
      },
      {
        type: 'checkbox',
        id: 'ignoreSlashes',
        label: 'Ignore Slashes',
        value: 'slashes',
        default: false
      },
      {
        type: 'checkbox',
        id: 'prefixCheckbox',
        label: 'Add Prefix',
        value: 'prefix',
        default: false
      },
      {
        type: 'text',
        value: ''
      }
    ]
    
    const numElements = dialogContents.length
    const elemHeight = 24
    const totalHeight = numElements * elemHeight
    var customView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 200, totalHeight));

    const viewContents = dialogContents.map((element, i) => {
      let type = element.type
      let yPos = totalHeight - ((i+1) * elemHeight)
      if (type == 'label') {
        return createLabel(NSMakeRect(0, yPos, 200, 25), 12, false, element.value);
      } else if (type == 'select') {
        return createSelect(NSMakeRect(0, yPos, 200, 25), element.value)
      } else if (type == 'checkbox') {
        return createCheckbox(NSMakeRect(0, yPos, 200, 25), element.label, element.value, element.default, true);
      } else if (type == 'text') {
        return createTextbox(NSMakeRect(0, yPos, 200, 25), 12, false, element.value)
      }
    })

    viewContents.forEach(subview => {
      customView.addSubview(subview)
    })
    dialog.setAccessoryView(customView)
    // Run the dialog
    if (dialog.runModal() != NSAlertFirstButtonReturn) {
      return
    }

    // Save the responses from that modal
    var caseIndex = viewContents[1].indexOfSelectedItem();
    var ignoreSlashes = viewContents[2].state();
    var showPrefix = viewContents[3].state();
    var prefix = viewContents[4].stringValue()

    // Create an Open dialog
    var open = NSOpenPanel.openPanel();
    open.canChooseFiles = false
    open.canChooseDirectories = true
    open.canCreateDirectories = true

    // run the open dialog
    if (open.runModal()) {
      var path = open.URL().path();
      const layers = selection.layers
      const ogLayerNames = layers.map(layer => layer.name)

      // Change the file names appropriately
      layers.forEach(layer => {
        let name = showPrefix ? prefix + layer.name : layer.name
        name = ignoreSlashes ? name.substring(name.lastIndexOf('/') + 1, name.length) : name

        if (caseIndex === 0) {
          layer.name = toKebab(name)
          console.log(layer.name)
        }
        else if (caseIndex === 1) {
          layer.name = toSnake(layer.name)
        }
        else if (caseIndex === 2) {
          layer.name = toCamel(layer.name)
        }
      })
  
      // Set the format and save path
      const exportOptions = {
        formats: 'svg',
        output: path
      }
      
      // Export the layers
      sketch.export(layers, exportOptions)


      // Reset the layer names
      layers.forEach((layer, i) => {
        layer.name = ogLayerNames[i]
      })
      // Show confirmation
      sketch.UI.message(`Exported ${layers.length} layers`)
    }
    
  
  }
}