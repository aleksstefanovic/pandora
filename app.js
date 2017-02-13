var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var pg = require('pg');
var path = require("path");

app.set('port', (process.env.PORT || 5000));

var phraseProcessor = require('./services/phraseProcessor');
var temperatureProcessor = require('./services/temperatureProcessor');

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

app.post('/temperatures', upload.array(), function (req, res, next) {
  console.log("REQUEST:"+JSON.stringify(req.body));
  var tempObj = req.body;
  var temp = tempObj.temp;
  var id = tempObj.id;
  console.log("NEW TEMP:"+temp);
  console.log("NEW ID:"+id);
	temperatureProcessor.insertNewTemp(temp, id).then(function() {
			res.send(true);
	});	
});

app.delete('/temperatures', upload.array(), function (req, res, next) {
  /*console.log("REQUEST:"+JSON.stringify(req.body));
  var tempObj = req.body;
  var temp = tempObj.temp;
  var id = tempObj.id;
  console.log("NEW TEMP:"+temp);
  console.log("NEW ID:"+id);*/
	temperatureProcessor.deleteOldestTemp().then(function() {
			res.send(true);
	});	
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/pandora.png'));
});

app.use(express.static('public')); 

app.get('/temperatures', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM temp_table ORDER BY id DESC limit 100', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send({results: result.rows}); }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
