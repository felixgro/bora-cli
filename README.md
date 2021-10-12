# bora-cli

Compare execution duration of various javascript functions.

## Installation
Install bora globally on your system using npm:
```bash
npm i -g bora-cli
```

## Usage
```
Usage: bora [options] <module>

Arguments:
  module                     Node module for execution duration meassuring

Options:
  -V, --version              output the version number
  -i, --iterations <number>  How often each method gets called for average
                             execution duration (default: 1)
  -p, --precision <number>   Amount of decimal places for resulting
                             milliseconds (default: 0)
  -h, --help                 display help for command
```