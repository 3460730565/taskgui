#!/usr/bin/env node

var fs = require('fs')
var tty = require('tty.js');
var express = require('express')
var userHome = require('user-home')
var currentPath = process.cwd()

var app = tty.createServer({
  shell: 'zsh',
  users: {
    foo: 'bar'
  },
  port: 8000
});

app.get('/foo', function(req, res, next) {
  res.send('bar');
});

app.use(express.static(__dirname + '/../static'));

var taskFile = __dirname +  '/static/task.json'
if (!fs.existsSync(taskFile)) {
  fs.writeFileSync(taskFile,  JSON.stringify({}, null, 4))
}

app.listen();


// fs.writeFileSync(__dirname + '/app/sre.json',  JSON.stringify(all, null, 4))