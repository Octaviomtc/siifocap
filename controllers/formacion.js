var mongoose              = require('mongoose');
var formacion             = mongoose.model('formacion');
var _                     = require('underscore');


// Dependencias
exports.findAllFormacion = function(req, res, next) {
    formacion.find(function(err, formacion_col) {
        if (!err){
          res.locals.formacion = formacion_col;
        }else{
          res.send(500, err.message);
        }
        return next();
    });
};



exports.findCampoEspecifico = function(req, res, next) {
  formacion.find({nombre_campo_amplio: req.body.nombre_campo_amplio}, function(err, formacion_col) {
    if (!err){

      var result = {};
      result.success = "true";
      result.content = formacion_col;
      res.locals.formacion = result;
      res.status(200).jsonp(result);
    }else{
      res.send(500, err.message);
    }
    return next();
  });
};


exports.findCampoCarrera = function(req, res, next) {

  formacion.findOne({nombre_campo_amplio: req.body.nombre_campo_amplio}, function(err, formacion_col) {

  //formacion.findOne({campo_especificonombre: {"$in" : ["Educación"]}}, function(err, formacion_col) {
    if (!err){


      // var even = _.find([1, 2, 3, 4, 5, 6], function(num){
      //   return num % 2 == 0;
      // });
      // console.log(even);
      var result = {};
      result.success = "true";
      // console.log(formacion_col.campo_especifico.length);
      // // console.log(_.size(formacion_col.campo_especifico));
      for (var i = 0; i < formacion_col.campo_especifico.length; i++){

        // console.log(formacion_col.campo_especifico[i].nombre);

        if (formacion_col.campo_especifico[i].nombre == req.body.nombre_campo_especifico){
          // console.log('ENCONTRADO');
          // console.log(formacion_col[i]);
          result.content = formacion_col.campo_especifico[i].campo_detallado;
          break;
        }else{
          // console.log('NO ENCONTRADO');
        }
      }

      //console.log(formacion_col.campo_especifico);


      res.locals.formacion = result;
      res.status(200).jsonp(result);
    }else{
      res.send(500, err.message);
    }
    return next();
  });
};
