var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/rename-export.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dialog.js":
/*!***********************!*\
  !*** ./src/dialog.js ***!
  \***********************/
/*! exports provided: dialog, viewContents, DIALOG_ELEMENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dialog", function() { return dialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewContents", function() { return viewContents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIALOG_ELEMENTS", function() { return DIALOG_ELEMENTS; });
/* harmony import */ var _macos_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./macos-ui */ "./src/macos-ui.js");

var DIALOG_TITLE = "Flat Export";
var ELEMENT_HEIGHT = 24;
var DIALOG_ELEMENTS = [{
  type: 'label',
  id: 'caseLabel',
  value: 'Name format:',
  paddingBottom: -2
}, {
  type: 'select',
  id: 'selectCase',
  value: ['kebab-case', 'snake_case', 'camelCase'],
  paddingBottom: 8
}, {
  type: 'checkbox',
  id: 'fullName',
  label: 'Use full layer name',
  value: 'full-name',
  default: true,
  paddingBottom: 8
}, {
  type: 'label',
  id: 'prefixLabel',
  value: 'Name prefix:',
  paddingBottom: -2
}, {
  type: 'text',
  id: 'prefix',
  value: '',
  placeholder: 'Prefix',
  paddingBottom: 8
}, {
  type: 'label',
  id: 'fileFormat',
  value: 'File format:',
  paddingBottom: -2
}, {
  type: 'select',
  id: 'selectFormat',
  value: ['svg', 'png', 'jpg'],
  paddingBottom: 8
}, {
  type: 'label',
  id: 'outputScale',
  value: 'Scale',
  paddingBottom: -2
}, {
  type: 'select',
  id: 'selectScale',
  value: ['@1x', '@2x', '@3x'],
  paddingBottom: 8
}]; // Create a custom dialog

var dialog = NSAlert.alloc().init();
dialog.setMessageText(DIALOG_TITLE);
dialog.addButtonWithTitle("Continue");
dialog.addButtonWithTitle("Cancel");
var COUNT_ELEMENTS = DIALOG_ELEMENTS.length;
var PADDING = DIALOG_ELEMENTS.map(function (elem) {
  return elem.paddingBottom;
}).reduce(function (acc, pad) {
  return acc + pad;
}, 0);
var TOTAL_MODAL_HEIGHT = COUNT_ELEMENTS * ELEMENT_HEIGHT + PADDING;
var customView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 200, TOTAL_MODAL_HEIGHT));
var position_next_elem = ELEMENT_HEIGHT;
var viewContents = DIALOG_ELEMENTS.map(function (element, i) {
  var type = element.type; // let padding = (i === 0 || i === 1 || i === 4) ? 0 : element.paddingBottom

  var yPos = TOTAL_MODAL_HEIGHT - position_next_elem; // ((i+1) * (ELEMENT_HEIGHT))

  var UIElement;

  if (type == 'label') {
    UIElement = Object(_macos_ui__WEBPACK_IMPORTED_MODULE_0__["createLabel"])(NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT), 12, false, element.value);
  } else if (type == 'select') {
    UIElement = Object(_macos_ui__WEBPACK_IMPORTED_MODULE_0__["createSelect"])(NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT), element.value);
  } else if (type == 'checkbox') {
    UIElement = Object(_macos_ui__WEBPACK_IMPORTED_MODULE_0__["createCheckbox"])(NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT), element.label, element.value, element.default, true);
  } else if (type == 'text') {
    UIElement = Object(_macos_ui__WEBPACK_IMPORTED_MODULE_0__["createTextbox"])({
      frame: NSMakeRect(0, yPos, 200, ELEMENT_HEIGHT),
      size: 12,
      text: element.value,
      placeholder: element.placeholder
    });
  }

  position_next_elem += ELEMENT_HEIGHT + element.paddingBottom;
  return UIElement;
});
viewContents.forEach(function (subview) {
  customView.addSubview(subview);
});
dialog.setAccessoryView(customView);


/***/ }),

/***/ "./src/macos-ui.js":
/*!*************************!*\
  !*** ./src/macos-ui.js ***!
  \*************************/
/*! exports provided: rect, createLabel, createTextbox, createSelect, createCheckbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rect", function() { return rect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabel", function() { return createLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextbox", function() { return createTextbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSelect", function() { return createSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCheckbox", function() { return createCheckbox; });
// -------------------------------------------------
// --------------- Dialog formatting ---------------
// -------------------------------------------------
function rect(x, y, w, h) {
  var rect = NSMakeRect(x, y, w, h);
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
  } else {
    label.setFont(NSFont.systemFontOfSize(size));
  }

  return label;
}
function createTextbox(_ref) {
  var frame = _ref.frame,
      size = _ref.size,
      bold = _ref.bold,
      text = _ref.text,
      placeholder = _ref.placeholder;
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setBezeled(true);
  label.setDrawsBackground(true);
  label.setEditable(true);
  label.setSelectable(true);
  label.placeholderString = placeholder;

  if (bold) {
    label.setFont(NSFont.boldSystemFontOfSize(size));
  } else {
    label.setFont(NSFont.systemFontOfSize(size));
  }

  return label;
}
function createSelect(frame, items) {
  var select = NSPopUpButton.alloc().initWithFrame(frame);

  for (var i = 0; i < items.length; i++) {
    if (items[i] == "--") {
      select.menu().addItem(NSMenuItem.separatorItem());
    } else {
      select.addItemWithTitle(items[i]);
    }
  }

  return select;
}
function createCheckbox(frame, name, value, onstate, enabled) {
  var checkbox = NSButton.alloc().initWithFrame(frame);
  checkbox.setButtonType(NSSwitchButton); // checkbox.setBezelStyle(1);

  checkbox.setTitle(name);
  checkbox.setTag(value);
  checkbox.setState(onstate ? NSOnState : NSOffState);
  checkbox.setEnabled(enabled);
  return checkbox;
}

/***/ }),

/***/ "./src/rename-export.js":
/*!******************************!*\
  !*** ./src/rename-export.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialog */ "./src/dialog.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
// documentation: https://developer.sketchapp.com/reference/api/


 // -------------------------------------------------
// ------------------- The Plugin ------------------
// -------------------------------------------------

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  if (!doc) return;
  var selection = doc.selectedLayers;

  if (selection.length === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message('No layers are selected.');
    return;
  } else {
    // Run the dialog
    if (_dialog__WEBPACK_IMPORTED_MODULE_1__["dialog"].runModal() !== NSAlertFirstButtonReturn) {
      return;
    } else {
      var caseElemIdx = _dialog__WEBPACK_IMPORTED_MODULE_1__["DIALOG_ELEMENTS"].findIndex(function (elem) {
        return elem.id === 'selectCase';
      });
      var prefixElemIdx = _dialog__WEBPACK_IMPORTED_MODULE_1__["DIALOG_ELEMENTS"].findIndex(function (elem) {
        return elem.id === 'prefix';
      });
      var fullNameElemIdx = _dialog__WEBPACK_IMPORTED_MODULE_1__["DIALOG_ELEMENTS"].findIndex(function (elem) {
        return elem.id === 'fullName';
      });
      var formatElemIdx = _dialog__WEBPACK_IMPORTED_MODULE_1__["DIALOG_ELEMENTS"].findIndex(function (elem) {
        return elem.id === 'selectFormat';
      });
      var scaleElemIdx = _dialog__WEBPACK_IMPORTED_MODULE_1__["DIALOG_ELEMENTS"].findIndex(function (elem) {
        return elem.id === 'selectScale';
      }); // Save the responses from that modal

      var caseIndex = _dialog__WEBPACK_IMPORTED_MODULE_1__["viewContents"][caseElemIdx].indexOfSelectedItem();
      var prefix = _dialog__WEBPACK_IMPORTED_MODULE_1__["viewContents"][prefixElemIdx].stringValue();
      var isFullName = _dialog__WEBPACK_IMPORTED_MODULE_1__["viewContents"][fullNameElemIdx].state();
      var formatvalueIndex = _dialog__WEBPACK_IMPORTED_MODULE_1__["viewContents"][formatElemIdx].indexOfSelectedItem();
      var scaleValueIndex = _dialog__WEBPACK_IMPORTED_MODULE_1__["viewContents"][scaleElemIdx].indexOfSelectedItem(); // sketch.UI.message(`${caseIndex}, ${prefix}, ${isFullName}, ${formatvalueIndex}`)
      // Create an Open dialog

      var open = NSOpenPanel.openPanel();
      open.canChooseFiles = false;
      open.canChooseDirectories = true;
      open.canCreateDirectories = true; // run the open dialog

      if (open.runModal()) {
        var path = open.URL().path();
        var layers = selection.layers; // Preserve the original layer names so we can change them back

        var originalLayerNames = layers.map(function (layer) {
          return layer.name;
        }); // Get the selected file format

        var fileFormat = _dialog__WEBPACK_IMPORTED_MODULE_1__["DIALOG_ELEMENTS"][formatElemIdx].value[formatvalueIndex];
        var scale = _dialog__WEBPACK_IMPORTED_MODULE_1__["DIALOG_ELEMENTS"][scaleElemIdx].value[scaleValueIndex].replace(/[@x]/, ''); // Change the file names appropriately

        layers.forEach(function (layer) {
          var newName = isFullName ? layer.name : layer.name.substring(layer.name.lastIndexOf('/') + 1, layer.name.length);
          newName = prefix == '' ? // NOT === because prefix is an object (...?)
          newName : "".concat(prefix, "-").concat(newName);

          if (caseIndex === 0) {
            layer.name = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toKebab"])(newName);
          } else if (caseIndex === 1) {
            layer.name = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toSnake"])(newName);
          } else if (caseIndex === 2) {
            layer.name = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toCamel"])(newName);
          }
        }); // Set the format and save path

        var exportOptions = {
          formats: fileFormat,
          scales: scale,
          output: path
        }; // Export the layers

        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(layers, exportOptions); // Reset the layer names

        layers.forEach(function (layer, i) {
          layer.name = originalLayerNames[i];
        }); // Show confirmation

        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Exported ".concat(layers.length, " layers."));
      }
    }
  }
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: delimitString, toSnake, toKebab, toCamel, toPascal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delimitString", function() { return delimitString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toSnake", function() { return toSnake; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toKebab", function() { return toKebab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCamel", function() { return toCamel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPascal", function() { return toPascal; });
// -------------------------------------------------
// ---------------- Text formatting ----------------
// -------------------------------------------------
var allDelimiters = /[\ \\\/\_\-\–\—]/g;
function delimitString(str, delimiter) {
  return str.replace(allDelimiters, delimiter).split(delimiter).filter(function (chunk) {
    return chunk.length !== 0;
  }).join(delimiter).toLowerCase();
}
function toSnake(str) {
  var delimiter = '_';
  if (typeof str !== 'string') return "";
  return delimitString(str, delimiter);
}
function toKebab(str) {
  var delimiter = '-';
  if (typeof str !== 'string') return "";
  return delimitString(str, delimiter);
}
function toCamel(str) {
  if (typeof str !== 'string') return "";
  str = delimitString(str, ' ').split(allDelimiters);

  if (str.length > 1) {
    for (var i = 1; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
  }

  return str.join('');
}
function toPascal(str) {
  var camel = toCamel(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__rename-export.js.map