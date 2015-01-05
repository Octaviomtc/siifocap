var logger                  = require("../utils/winston");
var User 					= require('../models/user');
var passport				= require('../passport/signup');
var bCrypt 					= require('bcrypt-nodejs');

exports.InicializaAdmin = function (){
	logger.info('Inicializando usuarios');
	User.findOne({ 'username' : 'admin'}, function(err, usuario) {
        if(!err){
        	if(!usuario){
        		logger.debug('Generando usuario administrador');
        		var newUser = new User();
                // set the user's local credentials
                newUser.username = 'admin';
                newUser.password = bCrypt.hashSync('admin', bCrypt.genSaltSync(10), null);
                newUser.email = 'admin@admin';
                newUser.firstName = 'admin';
                newUser.lastName = 'admin';
                newUser.rol = 'admin';

                // save the user
                newUser.save(function(err) {
                    if (err){
                        logger.error('Error al guardar administrador: '+err);
                        throw err;
                    }
                    console.log('Administrador guardado');                    
                    // return;
                });
        	}else{
        		logger.debug('Usuario administrador activo');
        	}
        }else{
        	logger.error('Inicializando usuarios error | '+err.message);
        }        
    });
}