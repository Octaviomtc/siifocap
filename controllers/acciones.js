var mongoose              = require('mongoose');
var accionesFormacion     = mongoose.model('acciones');
var logger                = require("../utils/winston");
var fs                    = require('fs-extra');
var _                     = require('underscore');

// Agregar accione de formacion
exports.addAccionFormacion = function(req, res, next) {
  var accion = new accionesFormacion(req.body);
  accion.save(function(err, accionFormacion) {
    if(err) return res.send(500, err.message);
    // console.log(unidad);
    res.accionFormacion = accionFormacion;
    // return next(), req.flash('message','Accion de formacion agregada correctamente.');
    return next();
  });
};


//Informacion de una sola accion de formacion
exports.findById = function(req, res, next) {
  accionesFormacion.findById(req.params.id, function(err, accionFormacion) {
    if(err) return res.send(500, err.message);

    console.log(accionFormacion.coparticipacion);
    res.locals.accionFormacion = accionFormacion;
    return next();
  });
};


// Obtener todas las acciones de formacion
exports.allAccionFormacion = function(req, res, next) {
  logger.debug('Buscando Acciones de Formacion...');
  accionesFormacion.find(function(err, acciones) {
    if(err) res.send(500, err.message);

    console.log('GET Acciones Formacion');
    res.locals.acciones = acciones;

    // console.log(acciones);
    return next();
  });

};

//update
exports.updateAccion = function(req, res, next) {
  accionesFormacion.findOneAndUpdate({_id:req.params.id}, req.body, function (err, accion) {
    if(err) res.send(500, err.message);
    // console.log(accion);
    res.accionFormacion = accion;
    return next();
  });
};




//Borrar
exports.deleteAccion = function(req, res, next) {
  accionesFormacion.findById(req.params.id, function(err, acciones) {
    acciones.remove(function(err) {
      if(err){
        return res.send(500, err.message);
      }
      console.log('Accion borrada / ');
      return next(), req.flash('message','Accion borrada correctamente.');
    });
  });

};



//Agrega planeacion didactica
exports.addPlaneacionDidactica = function(req, res, next){
    // 
    // function acciones_formacion(cur){
    //   accionesFormacion.findById(req.params.id, function(err, accionFormacion) {
    //     if(err) return res.send(500, err.message);
    //     cur = accionFormacion.cur;
    //     return cur;
    //   });
    // }
    //
    // var cur = "";
    // acciones_formacion(cur);
    // console.log(cur);
    //

    accionesFormacion.findOneAndUpdate(
      {
        _id:req.params.id
      },
      { $push :{
                  planeacion_didactica: req.body
               }
      },function (err, accion) {
          if(err){
            console.log(err);
          }else{


            if(_.isEmpty(req.files)){
              console.log("no hay archivos que agregar");
            }else{
              // RUTA DE ARCHIVOS TEMPORALES
              var temp_file = config.root+ "/temp/uploads/acciones_formacion/planeacion_didactica/"+req.files.instrumento_archivo_evaluacion.name;
              // RUTA PARA NUEVOS ARCHIVOS
              var new_file = config.root+ "/uploads/acciones_formacion/planeacion_didactica/"+req.params.id+"/"+req.params.id+"."+req.files.instrumento_archivo_evaluacion.extension;

              // Se mueve el archivo temporal
              fs.move(temp_file, new_file, function(err) {
                if (err) return console.error(err);
                console.log("success!");
              });
            }


            console.log("Planeacion agregada");
            res.accionFormacion = accion;
            console.log(accion.planeacion_didactica);
            return next();
          }
      }
    );
  // console.log("agregando planeacion");
};
