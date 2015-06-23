var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var dictamen              = mongoose.model('dictaminacion');
var accionesFormacion     = mongoose.model('acciones');

var _                     = require('underscore');




exports.addDictamen = function(req, res, next) {

  var obj = [];
  obj.dictaminacion = req.body;

  console.log(req.body.pregunta);

  console.log("*******************");

  var body = {};
  body.dictaminacion = req.body.pregunta;

  accionesFormacion.findOneAndUpdate({_id:req.params.id}, body, function (err, accion) {
    if(err) res.send(500, err.message);
    // console.log(accion);
    res.accionFormacion = accion;
    return next();
  });
};





exports.findById = function(req, res, next) {
  dictamen.findById(req.params.id, function(err, idictamen) {
    if(err) return res.send(500, err.message);
      
       res.locals.dictamen = idictamen;
       return next();
    });
};
