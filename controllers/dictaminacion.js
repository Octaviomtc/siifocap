var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var dictamen              = mongoose.model('dictaminacion');
var accionesFormacion     = mongoose.model('acciones');

var _                     = require('underscore');




exports.addDictamen = function(req, res, next) {
  var pregunta = req.body.pregunta;
  console.log('********');
  logger.info('********');
  var dictaminacion = [];

  var puntaje = 0;
  for (var i=0; i<pregunta.length; i++ ){
    var asw = [];
    asw[0] = pregunta[i];
    puntaje = Number(puntaje)+Number(pregunta[i].respuesta);
    dictaminacion.push({"pregunta":asw});
  }

  var obj ={};
  obj.puntaje_dictaminado = puntaje;
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
