var mongoose              = require('mongoose');
var escuelas             = mongoose.model('escuelas_privadas');
var _                     = require('underscore');


// Dependencias
exports.findAllEscuelas = function(req, res, next) {
  escuelas.find(function(err, escuelas_col) {
        if (!err){
          res.locals.escuelas_privadas = escuelas_col;
        }else{
          res.send(500, err.message);
        }
        return next();
    });
};
