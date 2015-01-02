var mongoose              = require('mongoose');
var formacion               = mongoose.model('formacion');



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
