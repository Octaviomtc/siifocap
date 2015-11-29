var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var accionesFormacion     = mongoose.model('acciones');

var _                     = require('underscore');





exports.crear = function(req, res, next) {
  accionesFormacion.findById(req.params.id, function(err, accion) {
    if(err) return res.send(500, err.message);
      
       // res.locals.dictamen = accion;
       // SE VERIFICA SI LA ACCION YA ESTA PROGRAMADA O NO 
      var programacion = accion.programacion;
      if(programacion && typeof programacion === 'undefined'){
          console.log("NO HAY PROGRAMACION");
      }else{
        console.log("ESTA ACCION DE FORMACIÓN YA CUENTA CON "+programacion.length+" PROGRAMACIONES.");
      }

      //SE CREA PROGRAMACION
      
      accionesFormacion.findOneAndUpdate(
      {
        _id:req.params.id
      },
      { $push :{
                  programacion: {contenido: ""}
               }
      },function (err, accion) {
          if(err){
            console.log(err);
          }else{


            console.log("Programación agregada");
            res.accionFormacion = accion;

            //SE OBTIENE LA ULTIMA PROGRAMACION AGREGADA 
            var programacion_nueva = accion.programacion;
            var last_programacion = _.max(programacion_nueva, function(programacion_nueva){ return programacion_nueva.createDate; });

            res.last_programacion = last_programacion;
            res.mensaje = "Se creó correctamente la programación";

            console.log("INFO - PROGRAMACION: "+last_programacion);
            return next();
          }
      }
    );


       // return next();
    });
};


exports.validateAccion = function(req, res, next){
  var idAccion = decrypt(req.params.id);
  var idProgramacion = decrypt(req.params.id2);
  //SE OBTIENE INFORMACION DE LA ACCION DE FORMACION 
  accionesFormacion.findById(idAccion, function(err, accion) {
      if(err) return res.send(500, err.message);
      res.accionFormacion = accion;
      res.locals.accionFormacion = accion;
      //Se busca informacion de la programacion especifica
      var programaciones = accion.programacion;

      var programacion =  _.where(programaciones, {id: idProgramacion});
      res.locals.idAccion=req.params.id;
      res.locals.idProgramacion=req.params.id2;
      return next();
  });
};
