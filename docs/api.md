# Api


## task.json

http://127.0.0.1:7878/task.json


```
// 20161128213541
// http://127.0.0.1:7878/task.json

{
  "root": "/Users/sang/workspace/taskgui/taskgui",
  "path": "/Users/sang/workspace/taskgui/taskgui-example",
  "tasks": {
    "gulp": {
      "prefix": "gulp",
      "tasks": [
        "some-task",
        "private-task",
        "default"
      ]
    },
    "npm_scripts": {
      "prefix": "npm run",
      "tasks": {
        "test": "echo \"Error: no test specified\" && exit 1"
      }
    },
    "grunt": {
      "prefix": "grunt",
      "tasks": [
        "default",
        "foo"
      ]
    }
  }
}

```