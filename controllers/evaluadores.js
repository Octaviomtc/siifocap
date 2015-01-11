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


//update
exports.updateEvaluador = function(req, res, next) {
  // console.log(req);
  evaluadores.findOneAndUpdate({_id:req.params.id}, req.body, function (err, evaluador) {
    if(err) res.send(500, err.message);
    // console.log(accion);
    res.evaluadores = evaluador;
    return next();
  });
};



exports.updateEvaluadorFiles = function(req, res, next) {

  if(req.files.cedula_profesional){
    // RUTA DE ARCHIVOS TEMPORALES
    var temp_file = config.root+ "/temp/uploads/evaluadores/files/"+req.files.cedula_profesional.name;
    // RUTA PARA NUEVOS ARCHIVOS
    var new_file = config.root+ "/uploads/evaluadores/formacion_academica/"+req.params.id+"/cedula_profesional."+req.files.cedula_profesional.extension;
    req.body.cedula_profesional = new_file;

    // Se mueve el archivo temporal
    fs.move(temp_file, new_file, function(err) {
      if (err) return console.error(err);
      console.log("success!");

    });


  }else{
    console.log("no archivo");
  }


  if(req.files.documentacion_probatoria){
    // RUTA DE ARCHIVOS TEMPORALES
    var temp_file2 = config.root+ "/temp/uploads/evaluadores/files/"+req.files.documentacion_probatoria.name;
    // RUTA PARA NUEVOS ARCHIVOS
    var new_file2 = config.root+ "/uploads/evaluadores/formacion_academica/"+req.params.id+"/documentacion_probatoria."+req.files.documentacion_probatoria.extension;
    req.body.documentacion_probatoria = new_file2;
    // Se mueve el archivo temporal
    fs.move(temp_file2, new_file2, function(err) {
      if (err) return console.error(err);
      console.log("success!");
    });


  }else{
    console.log("no archivo");
  }



  // console.log("**********************");
  // console.log(req.body);

  evaluadores.findOneAndUpdate({_id:req.params.id}, req.body, function (err, evaluador) {
    if(err) res.send(500, err.message);
    // console.log(accion);
    res.evaluadores = evaluador;
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
