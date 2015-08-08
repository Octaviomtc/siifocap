var mongoose              = require('mongoose');
var facilitadores           = mongoose.model('facilitadores');
var logger                = require("../utils/winston");
var fs                    = require('fs-extra');
var _                     = require('underscore');

// Agregar accione de formacion
exports.addFacilitadores = function(req, res, next) {
  // console.log(req.body);
  var facilitador = new facilitadores(req.body);
  facilitador.save(function(err, facilitadores) {
    if(err) return res.send(500, err.message);
    // console.log(unidad);
    // console.log(facilitadores);
    res.facilitadores = facilitadores;
    return next();
  });
};


//update
exports.updateFacilitador = function(req, res, next) {
  // console.log("2we9oi");
  // console.log(req.body);
  var body = req.body;

  facilitadores.findOneAndUpdate({_id:req.params.id}, req.body, function (err, facilitador) {
    if(err) res.send(500, err.message);
    console.log(facilitador);
    res.facilitadores = facilitador;
    return next();
  });
};



exports.updateFacilitadorFiles = function(req, res, next) {

  if(req.files.cedula_profesional){
    // RUTA DE ARCHIVOS TEMPORALES
    var temp_file = config.root+ "/temp/uploads/facilitadores/files/"+req.files.cedula_profesional.name;
    // RUTA PARA NUEVOS ARCHIVOS
    var new_file = config.root+ "/uploads/facilitadores/formacion_academica/"+req.params.id+"/cedula_profesional."+req.files.cedula_profesional.extension;
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
    var temp_file2 = config.root+ "/temp/uploads/facilitadores/files/"+req.files.documentacion_probatoria.name;
    // RUTA PARA NUEVOS ARCHIVOS
    var new_file2 = config.root+ "/uploads/facilitadores/formacion_academica/"+req.params.id+"/documentacion_probatoria."+req.files.documentacion_probatoria.extension;
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

  facilitadores.findOneAndUpdate({_id:req.params.id}, req.body, function (err, facilitador) {
    if(err) res.send(500, err.message);
    // console.log(accion);
    res.facilitadores = facilitador;
    return next();
  });
};




//Informacion de un un solo facilitador
exports.findById = function(req, res, next) {
  facilitadores.findById(req.params.id, function(err, facilitador) {
    if(err) return res.send(500, err.message);


    res.locals.facilitador = facilitador;
    return next();
  });
};



//Inicializa Facilitadores
exports.initFacilitadores = function(req, res, next){
//define_cur(req);
  var facilitadoresInit = new facilitadores({});
  facilitadoresInit.save(function(err, arregloFacilitadores) {
    if(err) return res.send(500, err.message);
    // console.log(unidad);
    res.facilitadores = arregloFacilitadores;
    console.log("Se crea facilitadores ");
    return next();
  });
}



exports.deleteFacilitador = function(req, res, next) {
  facilitadores.findById(req.params.id, function(err, facilitador) {
    facilitador.remove(function(err) {
      if(err){
        return res.send(500, err.message);
      }
      console.log('facilitador borrado / ');
      return next(), req.flash('message','facilitador borrado correctamente.');
    });
  });

};


// Obtener todos los facilitadores
exports.allFacilitadores = function(req, res, next) {
  logger.debug('Buscando Facilitadores..');
  facilitadores.find(function(err, facilitador) {
    if(err) res.send(500, err.message);

    console.log('GET Facilitadores');
    res.locals.facilitadores = facilitador;

    // console.log(acciones);
    return next();
  });

};