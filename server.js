var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt'),
	db = require("./config/db.js")


var app = express();
var port = process.env.PORT || 9000;

// configure express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views')
app.engine('html', require('ejs').renderFile);

// connect mongo
mongoose.connect(db.urlLocal); // connect to our database

// configure passport
require('./config/auth.js')(passport)

// configure routes
require('./routes.js')(app, passport);

app.listen(port, function(){
	console.log("Listening on port", port)
});