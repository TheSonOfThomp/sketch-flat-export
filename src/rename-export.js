// documentation: https://developer.sketchapp.com/reference/api/
import sketch from 'sketch'

import { dialog, viewContents, DIALOG_ELEMENTS } from './dialog'

import {
  toSnake,
  toKebab,
  toCamel
} from './utils'

// -------------------------------------------------
// ------------------- The Plugin ------------------
// -------------------------------------------------

export default function(context) {

  const doc = sketch.getSelectedDocument()
  if (!doc) return
  const selection = doc.selectedLayers

  if (selection.length === 0) {
    sketch.UI.message('No layers are selected.')
    return
  } else {
    // Run the dialog
    if (dialog.runModal() !== NSAlertFirstButtonReturn) {
      return
    } else {
      const caseElemIdx = DIALOG_ELEMENTS.findIndex(elem => elem.id === 'selectCase')
      const prefixElemIdx = DIALOG_ELEMENTS.findIndex(elem => elem.id === 'prefix')
      const fullNameElemIdx = DIALOG_ELEMENTS.findIndex(elem => elem.id === 'fullName')
      const formatElemIdx = DIALOG_ELEMENTS.findIndex(elem => elem.id === 'selectFormat')
      const scaleElemIdx = DIALOG_ELEMENTS.findIndex(elem => elem.id === 'selectScale')
    
      // Save the responses from that modal
      const caseIndex = viewContents[caseElemIdx].indexOfSelectedItem();
      const prefix = viewContents[prefixElemIdx].stringValue()
      const isFullName = viewContents[fullNameElemIdx].state();
      const formatvalueIndex = viewContents[formatElemIdx].indexOfSelectedItem();
      const scaleValueIndex = viewContents[scaleElemIdx].indexOfSelectedItem();
      
      // sketch.UI.message(`${caseIndex}, ${prefix}, ${isFullName}, ${formatvalueIndex}`)
      
      // Create an Open dialog
      const open = NSOpenPanel.openPanel();
      open.canChooseFiles = false
      open.canChooseDirectories = true
      open.canCreateDirectories = true
    
      // run the open dialog
      if (open.runModal()) {
        const path = open.URL().path();
        const layers = selection.layers
    
        // Preserve the original layer names so we can change them back
        const originalLayerNames = layers.map(layer => layer.name)
    
        // Get the selected file format
        const fileFormat = DIALOG_ELEMENTS[formatElemIdx].value[formatvalueIndex]

        const scale = DIALOG_ELEMENTS[scaleElemIdx].value[scaleValueIndex].replace(/[@x]/, '')
    
        // Change the file names appropriately
        layers.forEach(layer => {
          let newName = isFullName ? layer.name : layer.name.substring(layer.name.lastIndexOf('/') + 1, layer.name.length) 

          newName = (prefix == '') // NOT === because prefix is an object (...?)
            ? newName
            : `${prefix}-${newName}`
          
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
          scales: scale,
          output: path,
        }
        
        // Export the layers
        sketch.export(layers, exportOptions)
    
        // Reset the layer names
        layers.forEach((layer, i) => {
          layer.name = originalLayerNames[i]
        })
        // Show confirmation
        sketch.UI.message(`Exported ${layers.length} layers.`)
      }
    }
  }
  
}