#!/usr/bin/env node

var fs = require('fs')
var tty = require('tty2');
var express = require('express')
var userHome = require('user-home')
var currentPath = process.cwd()

var app = tty.createServer({
  static: __dirname + "/static",
  shell: 'zsh',
  users: {
    foo: 'bar'
  },
  port: 8000
});

app.get('/foo', function(req, res, next) {
  res.send('bar');
});

// app.use(express.static(__dirname + '/static'));

var taskFile = __dirname + '/static/task.json'
if (!fs.existsSync(taskFile)) {
  fs.writeFileSync(taskFile,  JSON.stringify({
    root:__dirname, 
    path: currentPath
  }, null, 4))
}

var packageFile = currentPath + '/package.json'

if (!fs.existsSync(packageFile)) {
  console.log('not exist package.json')
  return
}

var cfg = require(packageFile)

var devDependencies = cfg.devDependencies


for(var k in devDependencies){
  console.log(k)
  if (/^tg-plugin/.test(k) === true) {
    var opts = {
      root:__dirname, 
      cwd: currentPath
    }
    require(currentPath + '/node_modules/' + k)(opts)
  }
}

app.listen();


// fs.writeFileSync(__dirname + '/app/sre.json',  JSON.stringify(all, null, 4))