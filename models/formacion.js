var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var formacionSchema = new Schema({
  nombre_campo_amplio: String,
  campo_especifico:{
    nombre_campo_especifico: String,
    campo_detallado:{
      nombre_campo_detallado: String
    }
  }
},
{
  collection : 'formacion'
}
);


module.exports = mongoose.model('formacion', formacionSchema);
