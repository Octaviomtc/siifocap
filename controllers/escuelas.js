var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var escuela               = mongoose.model('escuela');
var dependencia           = mongoose.model('dependencia');
var usuarios              = mongoose.model('User');

// Dependencias
exports.findAllDependencias = function(req, res, next) {
    logger.debug('[DEPENDENCIAS] Obteniendo Dependencias')
    dependencia.find(function(err, dependencias) {
        if (!err){
          logger.info('[DEPENDENCIAS] Registros obtenidos ::' +dependencias.length)
          res.locals.dependencias = dependencias;
        }else{
          logger.error('[DEPENDENCIAS] Error DB :: '+err.message)
          res.send(500, err.message);
        }
        return next();
    });
};


exports.findAllEscuelas = function(req, res, next) {
    escuela.find(function(err, escuelas) {
        if(err) res.send(500, err.message);

        console.log('GET / escuelas');
        res.locals.escuelas = escuelas;
        return next();
    });

};


exports.deleteEscuela = function(req, res, next) {
        escuela.findById(req.params.id, function(err, escuelas) {
            escuelas.remove(function(err) {
                if(err) return res.send(500, err.message);
                console.log('Unidad borrada / ');
                return next(), req.flash('message','Unidad borrada correctamente.');
            })
        });

};


exports.findById = function(req, res, next) {
    escuela.findById(req.params.id, function(err, iescuela) {
    if(err) return res.send(500, err.message);

       // console.log(iescuela);
       res.locals.escuela = iescuela;
       return next();
    });
};


exports.findByDep = function(req, res) {
    escuela.find({dependencia: req.body.dependencia}, function(err, escuelas) {
        if(err) res.send(500, err.message);
        var escuelasDep={};
        escuelasDep.escuelas = escuelas;
        escuelasDep.success = true;

        res.status(200).jsonp(escuelasDep);
    });
};


exports.addUnidad = function(req, res, next) {

    var unidad = new escuela(req.body);

    unidad.save(function(err, unidad) {
        if(err) return res.send(500, err.message);
    return next(), req.flash('message','Unidad agregada correctamente.');
    });
};

exports.updateUnidad = function(req, res, next) {
    escuela.findById(req.params.id, function(err, escuela) {
          escuela.clave = req.body.clave;
          escuela.nombre = req.body.nombre;
          escuela.siglas = req.body.siglas;
          escuela.email = req.body.email;
          escuela.dependencia = req.body.dependencia;
          escuela.responsable = req.body.responsable;
          escuela.extension = req.body.extension;
          escuela.cargo = req.body.cargo;
          escuela.direccion = req.body.direccion;

        escuela.save(function(err) {
            if(err) return res.send(500, err.message);
      return next(), req.flash('message','Unidad actualizada correctamente.');
        });
    });
};
