var mongoose              = require('mongoose');
var request               = require('superagent');
var logger                = require("../utils/winston");
var dictamen              = mongoose.model('dictaminacion');






exports.findById = function(req, res, next) {
  dictamen.findById(req.params.id, function(err, idictamen) {
    if(err) return res.send(500, err.message);

       res.locals.dictamen = idictamen;
       return next();
    });
};



exports.addDictamen = function(req, res, next) {
  console.log(req.body);
    var dictamen_obj = new dictamen(req.body);

    // console.log(req.body);

    dictamen_obj.save(function(err, dictamen) {
        if(err) return res.send(500, err.message);

        console.log('Dictamen realizado');
        // console.log(dictamen);
        res.locals.dicta = dictamen;
        return next(), req.flash('message','Dictamen realizado') ;
    });
};


exports.addDictamenAccion = function(req, res, next) {
  console.log("*********************");
  console.log(res.locals.dicta.id);
  //HAcer suma de puntaje



  // console.log(req);

  //
  // dictamen_obj.save(function(err, dictamen) {
  //   if(err) return res.send(500, err.message);
  //
  //
  //   return next(), req.flash('message','Dictamen realizado');
  // });
};
