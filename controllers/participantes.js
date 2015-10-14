var mongoose                = require('mongoose');
var participantes           = mongoose.model('participante');
var logger                  = require("../utils/winston");


exports.deleteParticipante = function(req, res, next) {
  logger.debug('Eliminando participante '+req.params.id);
  participantes.findById(req.params.id, function(err, participante) {
    if(!err){
      logger.debug('Participante localizado');
      participante.remove(function(err) {
        if(!err){
          logger.info('Participante eliminado correctamente');
          req.flash('message','Participante eliminado correctamente.');
          return next();
        }else{
          logger.error('Eliminando participante, buscando, borrando | '+err.message);
          return res.send(500, err.message);
        }
      });
    }else{
      logger.error('Eliminando participante, buscando | '+err.message);
      res.send(500, err.message);
    }
  });
};



exports.allParticipantes = function (req, res, next){
  logger.debug('Buscando participantes...');
  participantes.find( function(err, participante){
    if(!err){
      res.locals.participantes = participante;
      return next();
    } else {
      logger.debug('Buscando participantes | '+err.message);
      res.send(500, err.message);
    }
  });
};



exports.findById = function(req, res, next) {
  logger.debug('Buscando por ID participante : ' +req.params.id);
  participantes.findById(req.params.id, function(err, participante) {
    if(!err){
      res.locals.participante = participante;
      return next();
    }else{
      logger.error('Buscando por ID participante | '+err.message)
      return res.send(500, err.message);
    }
  });
};




exports.addParticipante= function(req, res, next){
  logger.debug('Agregando nuevo participante');
  var participante = new participantes(req.body);
  participante.save( function(err, participante){
    if(!err){
      req.flash('message','Participante agregado correctamente');
      return next(); 
    } else {
      logger.error('Agregando nuevo participante | '+err.message);
      return res.send(500, err.message);
    }
  });
};





exports.updateParticipante = function(req, res, next) {
  logger.debug('Actualizando participante : '+req.params.id);
  participantes.findOneAndUpdate({_id:req.params.id}, req.body, function (err, participante) {
    if(!err){
      req.flash('message','Participante actualizado correctamente');
      return next();
    }else{
      logger.error('Actualizando participante | '+err.message);
      res.send(500, err.message);
    }
  });
};


exports.findCurp = function(req, res, next) {
  logger.debug('Revisando curp: '+req.body.curp);
  console.log('Revisando curp: '+req.body.curp);

  participantes.findOne({curp: req.body.curp}, function(err, participantes_curp) {
    console.log(participantes_curp);

    if (err){
      

      // var result = {};
      // result.success = "true";
      // result.content = formacion_col;
      // res.locals.formacion = result;
      // res.status(200).jsonp(result);
      req.flash('message','Ocurrió un error al insertar el registro.');
      res.redirect('/participantes');

    }else{
      if(participantes_curp){
        console.log("CURP EXISTE");
        logger.debug('CURP EXISTE: '+req.body.curp);
        req.flash('message','Ocurrió un error al insertar el registro, la CURP ya existe en otro participante.');
        res.redirect('/participantes');
      }else{
        console.log("CURP OK");
        return next();
      }
      // res.send(500, err.message);
    }
  });
};

