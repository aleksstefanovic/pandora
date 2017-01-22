var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var phraseProcessor = require('./services/phraseProcessor');

app.use(bodyParser.json());

app.post('/phrases', upload.array(), function (req, res, next) {
  console.log("REQUEST:"+JSON.stringify(req.body));
  var phraseObj = req.body;
  var phrase = phraseObj.phrase;
  console.log("PHRASE:"+phrase);
  phraseProcessor.readIn(phrase).then(function(result) {
  	console.log("READ RESULT:"+result);
    res.send(result);
  });
});
 
app.get('/', function (req, res) {
  res.send('Pandora')
})

app.listen(3000)
