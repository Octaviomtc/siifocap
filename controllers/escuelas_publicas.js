var mongoose              = require('mongoose');
var escuelas             = mongoose.model('escuelas_publicas');
var _                     = require('underscore');


// Dependencias
exports.findAllEscuelas = function(req, res, next) {
  escuelas.find(function(err, escuelas_col) {
        if (!err){
          res.locals.escuelas_publicas = escuelas_col;
        }else{
          res.send(500, err.message);
        }
        return next();
    });
};
