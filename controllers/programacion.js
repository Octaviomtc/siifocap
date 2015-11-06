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


       // return next();
    });
};
