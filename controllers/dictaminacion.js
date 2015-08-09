var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var dictamen              = mongoose.model('dictaminacion');
var accionesFormacion     = mongoose.model('acciones');

var _                     = require('underscore');




exports.addDictamen = function(req, res, next) {

  var pregunta = req.body.pregunta;

  var dictaminacion = [];

  for (var i=0; i<pregunta.length; i++ ){
    console.log(pregunta[i]);
    var asw = [];
    asw[0] = pregunta[i];
    dictaminacion.push({"puntaje": 0,"pregunta":asw});
  }

  var obj ={};
  obj.dictaminacion = dictaminacion;


  accionesFormacion.findOneAndUpdate({_id:req.params.id}, obj, function (err, accion) {
    if(err) res.send(500, err.message);
    //console.log(accion);
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
