var mongoose              = require('mongoose');
var accionesFormacion     = mongoose.model('acciones');
var logger                = require("../utils/winston");
var fs                    = require('fs-extra');
var _                     = require('underscore');
var year                  = require('year');



//Definicion de CUR
function define_cur(req){
  //Se define el tipo de a quien va dirigida la accion de formacion
  var personal_tipo = "4";
  switch(req.body.dirigido_a_tipo) {
    case "funcionarios":
      personal_tipo="1";
      break;
    case "docentes":
      personal_tipo="2";
      break;
    case "paae":
      personal_tipo="3";
      break;
    default:
      personal_tipo="4";
  }

  //Tipo de accion de formacion
  var accion_tipo = "4";
  switch(req.body.tipo_accion_Formacion) {
    case "Curso":
      accion_tipo="C";
      break;
    case "Taller":
      accion_tipo="T";
      break;
    case "Seminario":
      accion_tipo="S";
      break;
    case "Diplamoda":
      accion_tipo = "D";
    default:
      accion_tipo="O";
  }


  var accion_modalidad = "";
  switch(req.body.modalidad_accion_Formacion) {
    case "escolarizada":
      accion_modalidad="E";
      break;
    case "no_escolarizada":
      accion_modalidad="NE";
      break;
    case "mixta":
      accion_modalidad="M";
      break;
    default:
      accion_modalidad="E";
  }

  var inicio = req.body.modalidad_fecha_inicio;
  inicio = inicio.split('-');
  var fecha_vigencia = inicio[2]+inicio[1]+inicio[0].substr(2,4);

  var fin = req.body.modalidad_fecha_fin;
  fin = fin.split('-');
  fecha_vigencia = fecha_vigencia+"-"+fin[2]+fin[1]+fin[0].substr(2,4);


  var cur = {
    titulo        : "CGFIE",
    anio          : year('yy'),
    terminacion   : "DO",//Puede ser DI pero aun no se define
    consecutivo   : 0,
    personal      : personal_tipo,
    tipo          : accion_tipo,
    costo         : "",//El costo aun no se define
    modalidad     : accion_modalidad,
    unidad_res    : "160", //Solicitar el catalogo de unidades
    vigencia      : fecha_vigencia,
    cur           : ""
  };



//   var maximo;
//   //SIGLAS DE TERMINACION PARA CONSECUTIVO, SOLO SE ESTA TOMANDO DO, FALTA DEFINIR DI
//   accionesFormacion.findOne({ "cur.terminacion" : "DO"}).sort({"cur.consecutivo": -1}).exec( function(err, doc) {
//       if(_.isEmpty(doc)){
//         console.log("No hay cur");
//         cur.consecutivo = 0;
//       }else{
//         cur.consecutivo = doc.cur.consecutivo;
//       }
//       console.log("*************************");
//       console.log(cur.consecutivo);
//   });
//
//
//
// console.log(cur);


  //Se arma cadena
  var cadena_cur = cur.titulo+"/"+cur.anio+"/";

  cur.cur = cadena_cur;

  // console.log(cur);

  req.body.cur = cur;
  return req;
}



//Inicializa una accion de formacion
exports.initAccionFormacion = function(req, res, next){
//define_cur(req);
  var accion = new accionesFormacion({});
  accion.save(function(err, accionFormacion) {
    if(err) return res.send(500, err.message);
    // console.log(unidad);
    res.accionFormacion = accionFormacion;
    console.log("Se crea accion de formacion ");
    console.log(accionFormacion);
    // return next(), req.flash('message','Accion de formacion agregada correctamente.');
    return next();
  });
}




// Agregar accione de formacion
exports.addAccionFormacion = function(req, res, next) {
  define_cur(req);
  console.log(req.body);

  // req.body.cur = cur;
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
  var body = req.body;

  if(req.body.active_coparticipacion){
    body.active_coparticipacion == true;
  }else{
    body.active_coparticipacion == false
  }

  console.log("*****  "+body.active_coparticipacion);
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
