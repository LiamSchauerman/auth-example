var LocalStrategy = require('passport-local').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../userModel.js');

module.exports = function(passport){
	// serialize and deserialize the user
	passport.serializeUser(function(user, done) {
	    done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	    User.findById(id, function(err, user) {
	        done(err, user);
	    });
	});

	// adding strategies to passport

	// local signup
	// see if we have the email address
		// yes
			//see if address is verified
				// yes - end
				// no - send response that email needs verification
		// no
			// hash the password
			// save user email and password to db
			// set emailVerified to false
			// create string for verification, save to db
			// send verification email

	passport.use('local', new LocalStrategy({
		    usernameField : 'email',
		    passwordField : 'password',
		    passReqToCallback : true
		},
		function(req, email, password, done) {
		        // check if a user is already logged in:
		        if (!req.user) {
		        	// see if a user exists with this email
		            User.findOne({ 'local.email' :  email }, function(err, user) {

		                // if there are any errors, return the error
		                if (err) return done(err);

		                // check if a user was found
		                if (user) {
		                	console.log("User found: ");
		                	console.log(user)
		                	if( user.emailVerified ){
			                    return done(null, user, {message : "Email already registered"});
		                	} else {
		                		return done(null, false, {message : "Please confirm your email address. Check your inbox."})
		                	}
		                } else {
		                    var newUser = new User();
		                    newUser.local.password = newUser.makeHash(password);
		                    newUser.local.email = email;
		                    newUser.local.emailVerified = false;

		                    newUser.save(function(err) {
		                        if (err) return done(err);
		                        return done(null, false, {message : "Account pending email verification"});
		                    });
		                }

		            });
		        } else {
		            // user already logged in
		            return done(null, req.user);
		        }
			}));
}