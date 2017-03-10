var express = require('express'),
    index = require('./routes'),
    path = require('path'),
    autocomplete = require('autocomplete');

var app = express.createServer(express.logger());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(allowCrossDomain);
});

app.get('/', index.page);
app.get('/packages', index.packages);
app.get('/weblabs', index.weblabs);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});