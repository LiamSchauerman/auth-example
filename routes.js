var User = require('./userModel.js');

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}

module.exports = function(app, passport){
	//rendering views
	app.get('/', isAuthenticated, function(req, res){
		res.render('index.html')
	})
	app.get('/signup', function(req, res){
		res.render('signup.html')
	})
	app.get('/login', function(req, res){
		res.render('login.html')
	})
	app.get('/pending', function(req, res){
		res.render("pending.html")
	})

	app.post('/signup',	passport.authenticate('local', {
		successRedirect: '/pending',
		failureRedirect: '/signup'
	}));
	app.post('/login', passport.authenticate('local', {
		successRedirect: "/",
		failureRedirect: "login"
	}))
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
}
