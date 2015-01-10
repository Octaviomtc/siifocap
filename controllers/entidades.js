var mongoose              = require('mongoose');
var entidades             = mongoose.model('entidades');
var _                     = require('underscore');


// Dependencias
exports.findAllEntidades = function(req, res, next) {
  entidades.find(function(err, entidades_col) {
        if (!err){
          res.locals.entidades = entidades_col;
        }else{
          res.send(500, err.message);
        }
        return next();
    });
};
