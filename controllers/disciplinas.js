var mongoose              = require('mongoose');
var disciplinas             = mongoose.model('disciplinas');
var _                     = require('underscore');


// Disciplinas
exports.findAllDisciplinas = function(req, res, next) {
  disciplinas.find(function(err, disciplinas_col) {
        if (!err){
          res.locals.disciplinas = disciplinas_col;
        }else{
          res.send(500, err.message);
        }
        return next();
    });
};
