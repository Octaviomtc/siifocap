var mongoose = require('mongoose');
var usuarios  = mongoose.model('User');
var roles  = mongoose.model('rol');
var bCrypt = require('bcrypt-nodejs');


// Roles
exports.allRoles = function(req, res, next) {
    roles.find(function(err, rol) {
	    if(err) res.send(500, err.message);

	    console.log('GET / rol');
	    var roles = rol;
	    res.locals.roles = rol;
	    return next();
    });

};


exports.allUsers = function(req, res, next) {
    usuarios.find(function(err, user) {
	    if(err) res.send(500, err.message);

	    console.log('GET / user');
	    var usuarios = user;
	    res.locals.usuarios = user;
	    // console.log(user);
	    return next();
    });

};

exports.deleteUser = function(req, res, next) {
	if (req.user._id==req.params.id){
		return next(), req.flash('message','Acción no permitida!! el usuario que se intenta eliminar es tu usuario.');
	}else{
	    usuarios.findById(req.params.id, function(err, user) {
	        user.remove(function(err) {
	            if(err) return res.send(500, err.message);
	     		console.log('Usuario borrado / user');
	     		return next(), req.flash('message','Usuario borrado correctamente.');
	        })
	    });
	}
};



exports.getUser = function(req, res, next) {

	    usuarios.findById(req.params.id, function(err, user) {
	         if(err) res.send(500, err.message);

	         res.locals.usuario = user;
		     console.log(user);
		    return next();
	    });
	
};



exports.editUser = function(req, res, next) {

	req.body.password = createHash(req.body.password);

	    usuarios.findOneAndUpdate({_id:req.params.id}, req.body, function(err, user) {
	        if(err) res.send(500, err.message);
		    return next(), req.flash('message','Usuario actualizado correctamente');
	    });
	
};

// Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    	}


