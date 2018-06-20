var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [
  {"id": 1, "text": "Hello, world!", "status": "active"},
  {"id": 2, "text": "Pick up groceries", "status": "complete"},
  {"id": 3, "text": "Buy guitar strings", "status": "archive"}
];
app.get('/', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;
  res.render('index', {bundle});
});

app.get('/todos', function(req, res) {
  res.json(JSON.stringify(todos));
});

app.get('/todos/:id', function(req, res) {
  var id = req.params.id;
  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', function(req, res) {
  var text = req.body.data.text;
  if (!text) {
    return res.status(400).json({"message": "text is required"});
  }

  var id = todos.length + 1;
  var newTodo = { "id": id, "text": text, "status": "active" };
  todos.push(newTodo);

  res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
  todos = todos.filter(function(elm, i){
    return elm.id !== req.body.data.id;
  });
  res.json(todos);

});

app.put('/todos/:id/:type', function(req, res) {
  if (!!req.params.type.match('all')) {
    todos.forEach(function(item){
      item.status = req.params.type.split('all')[0];
    });
    res.json(todos);
  } else {
    var matchId = req.params.id - 1;
    todos[matchId].status = (req.params.type == 'complete') ? "complete" : 'archive';
    res.json(todos);
  }
});

app.get('*', function (req, res){
  var bundle = `//${req.hostname}:8080/public/bundle.js`;
  res.render('index', {bundle});
})


// Node server.
var port = 3000;
var server = app.listen(port, function() {
  console.log('SERVER STARTED LISTENING ON PORT ' + port);
});


// Dev server.
var devServer = require('../../tools/development-server');
var devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
