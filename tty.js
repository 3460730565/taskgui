var tty = require('tty.js');
var express = require('express')

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

app.listen();