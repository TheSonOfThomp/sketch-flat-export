var that = this;
function __skpm_run (key, context) {
  that.context = context;

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
 // documentation: https://developer.sketchapp.com/reference/api/
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

function createTextbox(frame, size, bold, text) {
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setBezeled(true);
  label.setDrawsBackground(true);
  label.setEditable(true);
  label.setSelectable(true);

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
} // -------------------------------------------------
// ---------------- Text formatting ----------------
// -------------------------------------------------


function toSnake(str) {
  if (typeof str !== 'string') return "";
  return str.replace(/[\ \\\/\-\–\—]/g, '_').toLowerCase();
}

function toKebab(str) {
  if (typeof str !== 'string') return "";
  return str.replace(/[\ \\\/\_]/g, '-').toLowerCase();
}

function toCamel(str) {
  if (typeof str !== 'string') return "";
  str = str.toLowerCase().split(/[\ \\\/\_\-\–\—]/g);

  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }

  return str.join('');
} // -------------------------------------------------
// ------------------- The Plugin ------------------
// -------------------------------------------------


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selection = doc.selectedLayers;

  if (selection.length === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message('No layers are selected.');
  } else {
    // Create a custom dialog
    var dialog = NSAlert.alloc().init();
    dialog.setMessageText("Rename and Export");
    dialog.addButtonWithTitle("Continue");
    dialog.addButtonWithTitle("Cancel"); // Create custom view and fields

    var dialogContents = [{
      type: 'label',
      id: 'caseLabel',
      value: 'Filename format:'
    }, {
      type: 'select',
      id: 'selectCase',
      value: ['kebab-case', 'snake_case', 'camelCase']
    }, {
      type: 'checkbox',
      id: 'prefixCheckbox',
      label: 'Add Prefix',
      value: 'prefix',
      default: false
    }, {
      type: 'label',
      id: 'prefixLabel',
      value: 'Prefix'
    }, {
      type: 'text',
      value: ''
    }];
    var numElements = dialogContents.length;
    var elemHeight = 24;
    var totalHeight = numElements * elemHeight;
    var customView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 200, totalHeight));
    var viewContents = dialogContents.map(function (element, i) {
      var type = element.type;
      var yPos = totalHeight - (i + 1) * elemHeight;

      if (type == 'label') {
        return createLabel(NSMakeRect(0, yPos, 200, 25), 12, false, element.value);
      } else if (type == 'select') {
        return createSelect(NSMakeRect(0, yPos, 200, 25), element.value);
      } else if (type == 'checkbox') {
        return createCheckbox(NSMakeRect(0, yPos, 200, 25), element.label, element.value, element.default, true);
      } else if (type == 'text') {
        return createTextbox(NSMakeRect(0, yPos, 200, 25), 12, false, element.value);
      }
    });
    viewContents.forEach(function (subview) {
      customView.addSubview(subview);
    });
    dialog.setAccessoryView(customView); // Run the dialog

    if (dialog.runModal() != NSAlertFirstButtonReturn) {
      return;
    } // Save the responses from that modal


    var caseIndex = viewContents[1].indexOfSelectedItem();
    var showPrefix = viewContents[2].state();
    var prefix = viewContents[4].stringValue(); // Create an Open dialog

    var open = NSOpenPanel.openPanel();
    open.canChooseFiles = false;
    open.canChooseDirectories = true;
    open.canCreateDirectories = true; // run the open dialog

    if (open.runModal()) {
      var path = open.URL().path();
      var layers = selection.layers;
      var ogLayerNames = layers.map(function (layer) {
        return layer.name;
      }); // Change the file names appropriately

      layers.forEach(function (layer) {
        var name = showPrefix ? prefix + layer.name : layer.name;

        if (caseIndex === 0) {
          layer.name = toKebab(name);
          console.log(layer.name);
        } else if (caseIndex === 1) {
          layer.name = toSnake(layer.name);
        } else if (caseIndex === 2) {
          layer.name = toCamel(layer.name);
        }
      }); // Set the format and save path

      var exportOptions = {
        formats: 'svg',
        output: path // Export the layers

      };
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(layers, exportOptions); // Reset the layer names

      layers.forEach(function (layer, i) {
        layer.name = ogLayerNames[i];
      }); // Show confirmation

      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Exported ".concat(layers.length, " layers"));
    }
  }
});

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
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=rename-export.js.map