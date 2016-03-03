const User = require('mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;


module.exports = function(config) {

  /**
   * Return the Passport Local Strategy object.
   */
  return new passportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, function(req, email, password, done) {
    let userData = {
      email: email.trim(),
      password: password.trim(),
      name: req.body.name.trim()
    };

    let newUser = new User(userData);
    newUser.save(function(err) {
      if (err) { return done(err); }

      return done(null);
    });
  });

};
