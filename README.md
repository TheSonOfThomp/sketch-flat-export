# Sketch Flat Export

## Purpose

This plugin lets you export your symbols and layers with manageable filenames into one folder, without needing to change your Sketch symbol nesting or naming conventions.

#### These Sketch symbols...
![sketch-symbols](assets/img-sketch-symbols.png)

#### ...export to these files
![sketch-symbols](assets/img-finder-files.png)

## Usage

To install, double click the `.sketchplugin` file, or move it to your plugins folder.

To use, press `⌃ Ctrl` + `⇧ Shift` + `E` to open the dialog.

![dialog](assets/img-dialog.png)

### Filename format
Choose between `kebab-case`, `snake_case` or `camelCase`

### Ignore slashes
Ignores any slashes as used in symbols
e.g. `Icon/Search` exports as `search.svg`

### Add Prefix
Text to add to the beginning of the filename
e.g. `icon-seach.svg`

***Note: Currently only `svg` files are supported.***
