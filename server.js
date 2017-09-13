var express = require('express');
var bodyParser = require('body-parser');
var apiV1 = require('./api/ApiV1');
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

app.route('/builds').get(function(req, res){
  res.status(200).send({buildCount : 10, builds : ['20-06-2017' ,'24-06-2017']});
});

apiV1(app);

// Middleware to handle Wrong APIs
app.use(function(req, res) {
  var path = req.originalUrl;
  console.log(path + ' Requested API is not available');
  res.status(404).send({url : path, message : 'API is not available'})
});

process.env.BASE_REPORT_DIR = "/d/Tech/Nodejs/reports-viewer/static/reports/";
var PORT = process.env.PORT || 2222;
app.listen(PORT, function() {
  console.log('Server is listening on port - ' + PORT);
});
