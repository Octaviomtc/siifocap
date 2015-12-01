var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var dictamen              = mongoose.model('dictaminacion');
var accionesFormacion     = mongoose.model('acciones');

var _                     = require('underscore');




exports.addDictaminacion = function(req,res,next){};


exports.addTecnica = function(req, res, next) {
  //accionesFormacion.findOneAndUpdate({_id:req.body.accion_id}, obj, function (err, tecnico){
  accionesFormacion.findOneAndUpdate({'_id':req.body.accion_id}, {$set: {'dictaminacion.tecnico':req.body}}, function (err, tecnico){
    if(err) 
      res.send(500, err.message);
    else
      res.locals.tecnico = tecnico;
      return next();
  });
};


exports.addFacilitadores = function (req, res, next) {
  //accionesFormacion.findOneAndUpdate({_id:req.body.accion_id}, obj, function (err, facilitador){
  accionesFormacion.findOneAndUpdate({'_id':req.body.accion_id}, {$set: {'dictaminacion.facilitador':req.body}}, function (err, facilitador){
    //({'ObjectSchema._id':req.body.commentId   {$push: {'ObjectSchema.$.secondTierComment':req.body.data}}, function (e, d) {
    if(err) 
      res.send(500, err.message);
    else
      res.locals.facilitador = facilitador;
      return next();
  });
};

exports.addAcademica= function (req, res, next) {  
    accionesFormacion.findOneAndUpdate({'_id':req.body.accion_id}, {$set: {'dictaminacion.academica':req.body}}, function (err, academica){
      if(err) 
        res.send(500, err.message);
      else
        res.locals.academica = academica;
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
