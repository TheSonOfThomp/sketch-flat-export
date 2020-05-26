import {
  createLabel,
  createTextbox,
  createSelect,
  createCheckbox
} from './macos-ui'

const DIALOG_TITLE = "Flat Export"

const ELEMENT_HEIGHT = 24;
const DIALOG_ELEMENTS = [
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
  {
    type: 'label',
    id: 'outputScale',
    value: 'Scale',
    paddingBottom: -2
  },
  {
    type: 'select',
    id: 'selectScale',
    value: ['@1x', '@2x', '@3x'],
    paddingBottom: 8
  },
]

// Create a custom dialog
const dialog = NSAlert.alloc().init();

dialog.setMessageText(DIALOG_TITLE);
dialog.addButtonWithTitle("Continue");
dialog.addButtonWithTitle("Cancel");

const COUNT_ELEMENTS = DIALOG_ELEMENTS.length
const PADDING = DIALOG_ELEMENTS.map(elem => elem.paddingBottom).reduce((acc, pad) => acc + pad, 0)
const TOTAL_MODAL_HEIGHT = COUNT_ELEMENTS * (ELEMENT_HEIGHT) + PADDING
const customView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 200, TOTAL_MODAL_HEIGHT));
let position_next_elem = ELEMENT_HEIGHT

const viewContents = DIALOG_ELEMENTS.map((element, i) => {
  let type = element.type

  // let padding = (i === 0 || i === 1 || i === 4) ? 0 : element.paddingBottom
  let yPos = TOTAL_MODAL_HEIGHT - position_next_elem // ((i+1) * (ELEMENT_HEIGHT))

  let UIElement;

  if (type == 'label') {
    UIElement = createLabel(NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT), 12, false, element.value);
  } else if (type == 'select') {
    UIElement = createSelect(NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT), element.value)
  } else if (type == 'checkbox') {
    UIElement = createCheckbox(NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT), element.label, element.value, element.default, true);
  } else if (type == 'text') {
    UIElement = createTextbox({
      frame: NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT),
      size: 12,
      text: element.value,
      placeholder: element.placeholder
    })
  }

  position_next_elem += ELEMENT_HEIGHT + element.paddingBottom

  return UIElement
})

viewContents.forEach(subview => {
  customView.addSubview(subview)
})
dialog.setAccessoryView(customView)

export { dialog, viewContents, DIALOG_ELEMENTS }