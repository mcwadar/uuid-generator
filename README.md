# nanoid-gen README

Generate nano-id style IDs on demand.

## Features

- Configurable ID generation
- Choose from different configurations using the Command Palette (Ctrl+Shift+P)
- Repeat last configuration using the keyboard shortcut. Default is (Ctrl+Shift+Insert)
  - If used without first using the Command Palette, the first configuration will be used.
- Right click menu gives quick access to both options
- Inserts unique IDs for each multiple cursor and/or selection

## Requirements

?

## Extension Settings

This extension contributes the following settings:

- `nanoid-gen.customAlphabet`: Provide a set of characters to use instead of the default set

- `nanoid-gen.configurations`: Set the ID generation settings using the following format

      {
        "label": "10 length alpha-numeric",   // Display Label
        "detail": "   ex: 97H23jY62R",        // Description
        "length": 10,                         // Number of characters to generate
        "type": "alphanumeric"                // Type of characters to use
      }

  - `nanoid-gen.configurations.type`: Supported values
    - letters: All letters, uppercase and lowercase (a-z + A-Z)
    - lowerLetters: All lowercase letters (a-z)
    - upperLetters: All uppercase letters (A-Z)
    - numbers: All numbers (0-9)
    - hex: All hexidecimal digits: (0-F)
    - alphanumeric: All letters and numbers (0-9 + a-z + A-Z)
    - custom: Use the custom alphabet defined in settings

## Known Issues

none

## Release Notes

### 0.0.1

Testing first vscode extension

### 0.1.0

Added context menu items