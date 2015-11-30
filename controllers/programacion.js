var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var accionesFormacion     = mongoose.model('acciones');
var moment                = require('moment');

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



      res.locals.programacionRes = programacion[0];
      res.locals.moment = require('moment');
      console.log(programacion[0]);

      res.programacion = programacion[0];
      res.programacionId = idProgramacion;
      res.locals.idAccion=req.params.id;
      res.locals.idProgramacion=req.params.id2;
      return next();
  });
};



exports.update2 = function(req, res, next){
  console.log(req.body);
  var idAccion = decrypt(req.params.id);
  var idProgramacion = decrypt(req.params.id2);
  //Se DEFINEN HORARIOS SI ES MULTIPLE LOS ESTARNDARES SE VUELVEN 0
  var horaInicio=req.body.hora_inicio;
  var horaFin=req.body.hora_fin;
  if(req.body.imultiple=="OK"){
    horaInicio="00:00";
    horaFin="00:00";
  }
  accionesFormacion.findOneAndUpdate(
    { "_id": idAccion, "programacion._id": idProgramacion},
    { 
        "$set": {
           "programacion.$.periodo_inicio": moment(req.body.periodo_inicio),
            "programacion.$.periodo_fin": moment(req.body.periodo_fin),
            "programacion.$.hora_inicio": horaInicio,
            "programacion.$.hora_fin": horaFin,
            "programacion.$.calendario.lunes": req.body.ilunes,
            "programacion.$.calendario.martes": req.body.imartes,
            "programacion.$.calendario.miercoles": req.body.imiercoles,
            "programacion.$.calendario.jueves": req.body.ijueves,
            "programacion.$.calendario.viernes": req.body.iviernes,
            "programacion.$.calendario.sabado": req.body.isabado,
            "programacion.$.horarioMultiple": req.body.imultiple
        }
    },
    function(err,doc) {
      if(err){
        return res.send(500, err.message)
      }
      return next();
    }
);
}
