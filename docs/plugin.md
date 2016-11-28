# plugin


## plugin list

- [tg-plugin-gulp](https://github.com/taskgui/tg-plugin-gulp)
- [tg-plugin-grunt](https://github.com/taskgui/tg-plugin-grunt)
- tg-plugin-webpack
- [tg-plugin-npm-scripts](https://github.com/taskgui/tg-plugin-npm-scripts)

## how to write plugin

插件名称以tg-plugin开头，参数为opts

example

```
var fs = require('fs')

module.exports = function (opts) {
  var conf = require(opts.cwd + '/package.json')
  var lines = []
  console.log('available script:')

  for (var _name in conf.scripts) {
    console.log('\t' + _name)
    var cmd = 'alias ' + _name + '=\'npm run ' + _name + '\''
    lines.push(cmd)
  }
  
  var all = require(opts.root + '/static/task.json')
  
  all.scripts = conf.scripts
  
  fs.writeFileSync(opts.root + '/static/task.json',  JSON.stringify(all, null, 4))
}

```
