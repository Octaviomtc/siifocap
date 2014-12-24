var mongoose = require('mongoose');
var accionesFormacion  = mongoose.model('acciones');



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

    // console.log(accionFormacion);
    res.locals.accionFormacion = accionFormacion;
    return next();
  });
};


// Obtener todas las acciones de formacion
exports.allAccionFormacion = function(req, res, next) {

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
    })
  });

};
