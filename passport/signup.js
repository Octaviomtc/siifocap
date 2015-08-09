var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            var usuario = req.user;
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error al crear cuenta: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('Ya existe el username que trata de registrar: '+username);
                        return done(null, false, req.flash('message','Ya existe el username que trata de registrar'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastNameP = req.param('lastNameP');
                        newUser.lastNameM = req.param('lastNameM');
                        newUser.rol = req.param('rol');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error al guardar usuario: '+err);
                                throw err;
                            }
                            console.log('Usuario guardado');
                            return done(null, usuario);
                            // return;
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    	}

	}
