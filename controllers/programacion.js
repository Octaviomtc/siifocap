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

   //SE CREAN VARIBLES PARA VERIFICAR DIAS 
  var lunesInicio = req.body.hora_inicio_lunes || "00:00";
  var lunesFin = req.body.hora_fin_lunes || "00:00";

  var martesInicio = req.body.hora_inicio_martes || "00:00";
  var martesFin = req.body.hora_fin_martes || "00:00";

  var miercolesInicio = req.body.hora_inicio_miercoles || "00:00";
  var miercolesFin = req.body.hora_fin_miercoles || "00:00";

  var juevesInicio = req.body.hora_inicio_jueves || "00:00";
  var juevesFin = req.body.hora_fin_jueves || "00:00";

  var viernesInicio = req.body.hora_inicio_viernes || "00:00";
  var viernesFin = req.body.hora_fin_viernes || "00:00";

  var sabadoInicio = req.body.hora_inicio_sabado || "00:00";
  var sabadoFin = req.body.hora_fin_sabado || "00:00";



  if(req.body.imultiple=="OK"){
    horaInicio="00:00";
    horaFin="00:00";
  }else{

    if(req.body.ilunes=="OK"){lunesInicio=horaInicio; lunesFin=horaFin}else{lunesInicio="00:00"; lunesFin="00:00"};
    if(req.body.imartes=="OK"){martesInicio=horaInicio; martesFin=horaFin}else{martesInicio="00:00"; martesFin="00:00"};
    if(req.body.imiercoles=="OK"){miercolesInicio=horaInicio; miercolesFin=horaFin}else{miercolesInicio="00:00"; miercolesFin="00:00"};
    if(req.body.ijueves=="OK"){juevesInicio=horaInicio; juevesFin=horaFin}else{juevesInicio="00:00"; juevesFin="00:00"};
    if(req.body.iviernes=="OK"){viernesInicio=horaInicio; viernesFin=horaFin}else{viernesInicio="00:00"; viernesFin="00:00"};
    if(req.body.isabado=="OK"){sabadoInicio=horaInicio; sabadoFin=horaFin}else{sabadoInicio="00:00"; sabadoFin="00:00"};
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
            "programacion.$.horarioMultiple": req.body.imultiple,

            "programacion.$.calendario.lunesInicio": lunesInicio,
            "programacion.$.calendario.martesInicio": martesInicio,
            "programacion.$.calendario.miercolesInicio": miercolesInicio,
            "programacion.$.calendario.juevesInicio": juevesInicio,
            "programacion.$.calendario.viernesInicio": viernesInicio,
            "programacion.$.calendario.sabadoInicio": sabadoInicio,

            "programacion.$.calendario.lunesFin": lunesFin,
            "programacion.$.calendario.martesFin": martesFin,
            "programacion.$.calendario.miercolesFin": miercolesFin,
            "programacion.$.calendario.juevesFin": juevesFin,
            "programacion.$.calendario.viernesFin": viernesFin,
            "programacion.$.calendario.sabadoFin": sabadoFin


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






  

exports.update3 = function(req, res, next){
  var idAccion = decrypt(req.params.id);
  var idProgramacion = decrypt(req.params.id2);

  accionesFormacion.findOneAndUpdate(
    { "_id": idAccion, "programacion._id": idProgramacion},
    { 
        "$set": {
           "programacion.$.sede": req.body.sede
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




exports.deleteProg = function(req, res, next){
  var idAccion = decrypt(req.params.id);
  var idProgramacion = decrypt(req.params.id2);

  accionesFormacion.findOneAndUpdate(
    { "_id": idAccion, "programacion._id": idProgramacion},
    { 
        "$set": {
           "programacion.$.estatus": "cancelada"
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



exports.addFile = function(req, res, next){
  var idAccion = decrypt(req.params.id);
  var idProgramacion = decrypt(req.params.id2);

  console.log("file");
  console.log(req.body);
  console.log(req.files);
  // buf = new Buffer(req.files.buffer);
  accionesFormacion.findOneAndUpdate(
    { "_id": idAccion, "programacion._id": idProgramacion},
    { 
        "$set": {
           "programacion.$.maximo": req.body.maximo
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
