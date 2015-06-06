var mongoose              = require('mongoose');
var unidades             = mongoose.model('unidades_politecnicas');
var _                     = require('underscore');


// Dependencias
exports.findDependencias = function(req, res, next) {
  unidades.find(function(err, dependencias_col) {
        if (!err){
          //Se recorre la consulta y solo se obtiene  el nombre de la dependecia
          var dependencias = [];
          var k, v;
          for (k in dependencias_col) {
            v = dependencias_col[k];
            if (dependencias_col[k] === void 0) {
              continue;
            }
            dependencias.push(v.dependencia);
          }
          res.locals.dependencias = dependencias;
        }else{
          res.send(500, err.message);
        }
        return next();
    });
};



// Escuelas
exports.findEscuelas = function(req, res, next) {
  unidades.find(function(err, Escuelas) {
        if (!err){
          res.locals.unidades = Escuelas;
          console.log(Escuelas);
        }else{
          res.send(500, err.message);
        }
        return next();
    });
};
