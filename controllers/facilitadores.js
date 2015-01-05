var mongoose                = require('mongoose');
var Facilita =  require('./../models/facilitador.js');
var facilitadores           = mongoose.model('facilitador');
var logger                  = require("../utils/winston");




exports.allFacilitadores = function (req, res, next){
  logger.debug('Buscando facilitadores...');
  facilitadores.find( function(err, facilitador){
    if(!err){
      res.locals.facilitador = facilitador;
      return next();
    } else {
      logger.debug('Buscando facilitador | '+err.message);
      res.send(500, err.message);
    }
  });
};