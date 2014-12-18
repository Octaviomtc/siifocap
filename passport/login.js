var LocalStrategy   			= require('passport-local').Strategy;
var User 									= require('../models/user');
var bCrypt 								= require('bcrypt-nodejs');
var logger                = require("../utils/winston");

module.exports = function(passport){
	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
						logger.info('Validando login |'+username + '|'+ password);
            User.findOne({ 'username' :  username },
                function(err, user) {

                    if (err){
												logger.error(err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
										}
										if (!user){
												logger.warn('El usuario ['+ username +' ] no existe ');
                        return done(null, false, req.flash('message', 'El usuario no existe.'));
                    }

                    if (!isValidPassword(user, password)){
                        logger.warn('Contraseña incorrecta');
                        return done(null, false, req.flash('message', 'Contraseña incorrecta')); // redirect back to login page
                    }
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

}
