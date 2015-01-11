var mongoose              = require('mongoose');
var evaluadores           = mongoose.model('evaluadores');
var logger                = require("../utils/winston");
var fs                    = require('fs-extra');
var _                     = require('underscore');

// Agregar accione de formacion
exports.addEvaluadores = function(req, res, next) {
  // console.log(req.body);
  var evaluador = new evaluadores(req.body);
  evaluador.save(function(err, evaluadores) {
    if(err) return res.send(500, err.message);
    // console.log(unidad);
    // console.log(evaluadores);
    res.evaluadores = evaluadores;
    return next();
  });
};


//Informacion de un un solo evaluador
exports.findById = function(req, res, next) {
  evaluadores.findById(req.params.id, function(err, evaluador) {
    if(err) return res.send(500, err.message);


    res.locals.evaluador = evaluador;
    return next();
  });
};
