var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;


var curSchema = new Schema({
  def: String,
  curso: Number,
  taller: Number,
  seminario: Number,
  diplomado: Number
},
{
  collection : 'cur'
});



var accionesFormacion     = mongoose.model('acciones');
var claveReg              = mongoose.model('cur', curSchema);
var logger                = require("../utils/winston");
var fs                    = require('fs-extra');
var _                     = require('underscore');
var year                  = require('year');
var deasync               = require('deasync'); // Tareas consecutivas
var sync                  = require('synchronize');
var moment                = require('moment');
var unidades_politecnicas = mongoose.model('unidades_politecnicas');



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

    //console.log(accionFormacion);
    res.locals.accionFormacion = accionFormacion;
    return next();
  });
};


//Informacion de una sola accion de formacion
exports.findByIdDictaminacion = function(req, res, next) {
  accionesFormacion.findById(req.params.id, function(err, accionFormacion) {
    if(err) return res.send(500, err.message);

    //console.log(accionFormacion.dictaminacion);
    res.locals.dictaminacion = accionFormacion.dictaminacion;
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



//Funcion que obtine consecutivo cur
function consecutivo(tipo){
  claveReg.findOne({
    def : "consecutivos"
  }, function(err, datoscur) {
    if(err) return "0000";

    var consecutivonext = "0000";
    var consecutivoAct = 0;

    if(tipo=="taller"){consecutivoAct=datoscur.taller};
    if(tipo=="curso"){consecutivoAct=datoscur.curso};
    if(tipo=="seminario"){consecutivoAct=datoscur.seminario};
    if(tipo=="diplomado"){consecutivoAct=datoscur.diplomado};

    //Se suna una unidad al consecutivo
    consecutivoAct = consecutivoAct+1;

    if(consecutivoAct.length == 1){consecutivonext="000"+consecutivoAct};
    if(consecutivoAct.length == 2){consecutivonext="00"+consecutivoAct};
    if(consecutivoAct.length == 3){consecutivonext="0"+consecutivoAct};
    if(consecutivoAct.length == 4){consecutivonext=consecutivoAct};


    return consecutivonext;
  });
}


//update
exports.updateAccion = function(req, res, next) {

  var body = req.body;

  // Obtiene el segmento de la url para establecer que'porcentaje de la accion se va a considerar aumentar
  var url = req.url;
  url = url.split("/");
  url = url[4];
  var porcentaje = 0;
  // console.log(url);

  //obtiene informacion del registro que se trata de actualizar
  accionesFormacion.findById(req.params.id, function(err, accionFormacion) {
    if(err) return res.send(500, err.message);

    // Si es datos generales
    if(url=="datos-generales"){
      // verifica si la accion ya se guardo en esta seccion
      if(accionFormacion.estatus_sec_1=="false"){
        porcentaje = 40;//Se define por cantidad de campos
      }
    }

    if(url=="justificacion"){
      // verifica si la accion ya se guardo en esta seccion
      if(accionFormacion.estatus_sec_2=="false"){
        porcentaje = 15;//Se define por cantidad de campos
      }
    }

    if(url=="encuadre"){
      // verifica si la accion ya se guardo en esta seccion
      if(accionFormacion.estatus_sec_3=="false"){
        porcentaje = 15;//Se define por cantidad de campos
      }
    }

    if(url=="planeacion"){
      // verifica si la accion ya se guardo en esta seccion
      if(accionFormacion.estatus_sec_4=="false"){
        porcentaje = 20;//Se define por cantidad de campos
      }
    }
    var consecutivonext = "0000";
    var consecutivoAct = 0;
    var tipo_accion_Formacion = accionFormacion.tipo_accion_Formacion;



    // SE CREA OBJETO CON PARAMETROS PARA GENERAR CUR
          var cur = {
              titulo        : "CGFIE",
              estado        : "P", // Por ahora todos quedan en provisional 
              anio          : year('yy'),
              terminacion   : "TR",//Puede ser DI pero aun no se define
              consecutivo   : 0,
              personal      : "0",
              tipo          : "O",
              costo         : "",//El costo aun no se define
              modalidad     : "O",
              unidad_res    : "0", //Solicitar el catalogo de unidades
              vigencia      : "00-00",
              cur           : ""
          };

    if(url=="finalizar"){
        if(accionFormacion.status >= 90 && accionFormacion.status < 100){
           //Se establece terminacion del consecutivo
          if(accionFormacion.dirigido_a_dependencia.toUpperCase()=="CGFIE"){cur.terminacion="DI"}; // Solicitado por directivos
          if(accionFormacion.dirigido_a_dependencia.toUpperCase()=="DES" || accionFormacion.dirigido_a_dependencia.toUpperCase()=="DEMS"){cur.terminacion="DO"}; //Solicitado por docentes
          porcentaje = 10;//Se define por cantidad de campos

          //Se define tipo personal a quien va dirigido dirigido_a_tipo
          if(accionFormacion.dirigido_a_tipo=='funcionarios'){cur.personal="1"}
          if(accionFormacion.dirigido_a_tipo=='docentes'){cur.personal="2"}
          if(accionFormacion.dirigido_a_tipo=='paae'){cur.personal="3"}
          if(accionFormacion.dirigido_a_tipo=='otros'){cur.personal="4"}
          if(accionFormacion.dirigido_a_tipo=='publica' || accionFormacion.dirigido_a_tipo=='privada'){cur.personal="5"}
          if(accionFormacion.dirigido_a_tipo=='alumnos' || accionFormacion.dirigido_a_tipo=='egresados'){cur.personal="6"}

          //modalidad_accion_Formacion
          if(accionFormacion.modalidad_accion_Formacion=='escolarizada'){cur.modalidad="E"}
          if(accionFormacion.modalidad_accion_Formacion=='no_escolarizada'){cur.modalidad="NE"}
          if(accionFormacion.modalidad_accion_Formacion=='mixta'){cur.modalidad="M"}


          // vigencia
          var modalidad_fecha_inicio = moment(accionFormacion.modalidad_fecha_inicio).format("DDMMYY");
          var modalidad_fecha_fin = moment(accionFormacion.modalidad_fecha_fin).format("DDMMYY");
          cur.vigencia = modalidad_fecha_inicio+"-"+modalidad_fecha_fin;

          // IMPORTANTE **************************************************************************

          //Se ejecuta funcion para obtener consecutivo
          claveReg.findOne({
            def : "consecutivos"
          }, function(err, datoscur) {
            if(err) res.send(500, err.message);

            var consecutivonext = "0000";
            var consecutivoAct = 0;

            // Se actualiza consecutivo
            var claveObj = {};

            if("taller"==tipo_accion_Formacion){consecutivoAct=datoscur.taller; cur.tipo="T"; claveObj.taller= datoscur.taller+1;};
            if("curso"==tipo_accion_Formacion){consecutivoAct=datoscur.curso; cur.tipo="C"; claveObj.curso= datoscur.curso+1;};
            if("seminario"==tipo_accion_Formacion){consecutivoAct=datoscur.seminario; cur.tipo="S"; claveObj.seminario= datoscur.seminario+1;};
            if("diplomado"==tipo_accion_Formacion){consecutivoAct=datoscur.diplomado; cur.tipo="D"; claveObj.diplomado= datoscur.diplomado+1;};

            //Se suma una unidad al consecutivo
            consecutivoAct = consecutivoAct+1;

            if(consecutivoAct <= 9){consecutivonext= "000"+consecutivoAct.toString()};
            if(consecutivoAct > 9 && consecutivoAct <= 99){consecutivonext= "00"+consecutivoAct.toString()};
            if(consecutivoAct > 99 && consecutivoAct <= 999){consecutivonext= "0"+consecutivoAct.toString()};
            if(consecutivoAct > 999 && consecutivoAct <= 9999){consecutivonext= consecutivoAct.toString()};

            cur.consecutivo = consecutivoAct;




            //Se ejecuta funcion para obtener consecutivo
            unidades_politecnicas.findOne({
              nombre : accionFormacion.unidad
            }, function(err, unidad){



                cur.unidad_res = unidad.codigo;

                var cur_gen  = "";
                if(cur.costo == "&"){
                  cur_gen = cur.titulo+"/"+cur.anio+"/"+cur.estado+"/"+consecutivonext+cur.terminacion+"/"+cur.personal+"/"+cur.tipo+"/"+cur.costo+"/"+cur.modalidad+"/"+cur.unidad_res+"/"+cur.vigencia;
                  }else{
                  cur_gen = cur.titulo+"/"+cur.anio+"/"+cur.estado+"/"+consecutivonext+cur.terminacion+"/"+cur.personal+"/"+cur.tipo+"/"+cur.modalidad+"/"+cur.unidad_res+"/"+cur.vigencia;
                }


                cur.cur=cur_gen;


                // body.cur = {
                //    titulo        : cur.titulo,
                //    estado        : cur.estado,
                //    anio          : cur.anio,
                //    terminacion   : cur.terminacion,
                //    consecutivo   : cur.consecutivo,
                //    personal      : cur.personal,
                //    tipo          : cur.tipo,
                //    costo         : cur.costo,
                //    modalidad     : cur.modalidad,
                //    unidad_res    : cur.unidad_res,
                //    vigencia      : cur.vigencia,
                //    cur           : cur.cur
                // };

                if(cur_gen.length == 41 || cur_gen.length == 42 ||  cur_gen.length == 43 ||  cur_gen.length == 44){
                  body.cur_gen = cur_gen;
                }else{
                  body.cur_gen = "Información incompleta";
                  porcentaje = 5;
                }


                body.status = accionFormacion.status + porcentaje; //Se agrega el porcentaje definido 


                if(req.body.active_coparticipacion){
                  body.active_coparticipacion == true;
                }else{
                  body.active_coparticipacion == false
                }


                accionesFormacion.findOneAndUpdate({_id:req.params.id}, body, function (err, accion) {
                  if(err) res.send(500, err.message);
                  res.accionFormacion = accion;


                  claveReg.findOneAndUpdate({def : "consecutivos"}, claveObj, function (err, accion) {
                    if(err) res.send(500, err.message);

                    return next();
                  });
                });

            });

          });
          // IMPORTANTE **************************************************************************
        }else{
          porcentaje = 0;
          body.status = accionFormacion.status + porcentaje; //Se agrega el porcentaje definido 


          // Define si la coparticipacion esta activa para mandar un dato al front y activar la casilla
          if(req.body.active_coparticipacion){
            body.active_coparticipacion == true;
          }else{
            body.active_coparticipacion == false
          }

          accionesFormacion.findOneAndUpdate({_id:req.params.id}, body, function (err, accion) {
            if(err) res.send(500, err.message);
            res.accionFormacion = accion;
            return next();
          });

        }
    }else{




          body.status = accionFormacion.status + porcentaje; //Se agrega el porcentaje definido 


          // Define si la coparticipacion esta activa para mandar un dato al front y activar la casilla
          if(req.body.active_coparticipacion){
            body.active_coparticipacion == true;
          }else{
            body.active_coparticipacion == false
          }

          accionesFormacion.findOneAndUpdate({_id:req.params.id}, body, function (err, accion) {
            if(err) res.send(500, err.message);
            res.accionFormacion = accion;
            return next();
          });

    }
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

  console.log("entro");
  console.log(req.params.id);

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
