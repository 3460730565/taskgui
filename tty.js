#!/usr/bin/env node

var fs = require('fs')
var tty = require('tty2');
var express = require('express')
var userHome = require('user-home')
var currentPath = process.cwd()

var exec = require('child_process').exec;
// exec('echo $SHELL', (err, stdout, stderr) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(stdout);
// });

var sh = process.env.SHELL.split('/')
// console.log(sh[sh.length-1])

var conf = {
  static: __dirname + "/static",
  shell: sh[sh.length-1],
  users: {
    // foo: 'bar'
  },
  port: 7878,
  plugins: [{'Gulpfile.js':"tg-plugin-gulp"},{"Gruntfile.js":  "tg-plugin-grunt"}, {"package.json": "tg-plugin-npm-scripts"}]
}

var app = tty.createServer(conf);

app.get('/foo', function(req, res, next) {
  res.send('bar');
});

// app.use(express.static(__dirname + '/static'));

var taskFile = __dirname + '/static/task.json'
if (!fs.existsSync(taskFile)) {
  fs.writeFileSync(taskFile,  JSON.stringify({
    root: __dirname, 
    path: currentPath,
    tasks: {}
  }, null, 4))
}

var packageFile = currentPath + '/package.json'

if (!fs.existsSync(packageFile)) {
  console.log('not exist package.json')
  return
}

var cfg = require(packageFile)

var devDependencies = cfg.devDependencies

for(var k in conf.plugins){
  console.log(conf.plugins[k])
  var i = conf.plugins[k];
  for(var j in i){
    var opts = {
      root:__dirname, 
      cwd: currentPath
    }
    console.log('build-in ' + j)
  
    require(i[j])(opts)
  }
}

for(var k in devDependencies){
  console.log(k)
  if (/^tg-plugin/.test(k) === true) {
    var opts = {
      root:__dirname, 
      cwd: currentPath
    }
    console.log('mount ' + currentPath + '/node_modules/' + k)
    require(currentPath + '/node_modules/' + k)(opts)
  }
}

app.listen();

require("open")("http://127.0.0.1:" + conf.port + "/");
// fs.writeFileSync(__dirname + '/app/sre.json',  JSON.stringify(all, null, 4))