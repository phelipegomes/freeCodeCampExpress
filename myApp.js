const mySecret = process.env['MESSAGE_STYLE'];

let bodyParser = require('body-parser');
let body = bodyParser.urlencoded({extended: false});

let express = require('express');
let app = express();

let myString = 'Hello World';
console.log(myString);

let absolutePath = __dirname + '/views/index.html';

app.use(body);

app.post("/name", (req, res) => {
  var { first : firstName, last: lastName } = req.body;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.use((req, res, next) => {
  var string = req.method + " " + req.path + " - " + req.ip;
  next(console.log(string));
});

app.get('/name', (req, res) => {
  var { first : firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  })
});

app.get("/:word/echo", (req, res, next) => {
  next();
}, (req, res) => {
  var word = req.params.word;
  res.json({echo: word});
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
  response = process.env.MESSAGE_STYLE === "uppercase" ?
  "Hello json".toUpperCase() : "Hello json";
  res.json({"message" : response});
});


app.use('/public', express.static(__dirname + '/public'));




































 module.exports = app;
