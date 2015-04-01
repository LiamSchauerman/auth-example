var User = require('./userModel.js');

module.exports = function(app, passport){
	//rendering views
	app.get('/', function(req, res){
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

	//handling post requests
	app.post('/signup', function(req, res){
		console.log(req.body);

		var newUser = new User();
		newUser.local.password = newUser.makeHash(req.body.password);
		newUser.local.email = req.body.email;
		newUser.local.emailVerified = false;

		newUser.save(function(err) {
			console.log('saving user')
		    if (err) return done(err);
			res.redirect('/pending')
		});
		// save user to db
		// send confirmation email to user
	})
	app.post('/confirm', passport.authenticate('local', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
}