# bora-cli

Compare execution duration of various javascript functions in a Node.js environment.

## Installation
Install bora globally on your system using npm:
```bash
npm i -g bora-cli
```

## Usage
```
Usage: bora [options] <module>

Arguments:
  module                     module file name for execution duration
                             meassuring. if no file found, bora will
                             create a template file with the provided name

Options:
  -V, --version              output the version number
  -i, --iterations <number>  amount of iterations for avarage execution
                             time calculations (default: 1)
  -p, --precision <number>   amount of decimal places for resulting
                             milliseconds (default: 0)
  -h, --help                 display help for command
```