var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session'),
	body-parser = require('body-parser');

var app = express();
var port = process.env.PORT || 9000;