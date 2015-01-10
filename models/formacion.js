var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var formacionSchema = new Schema({
  nombre_campo_amplio: String,
  campo_especifico:[{
    nombre: String,
    campo_detallado:[{
      nombre: String
    }]
  }]
},
{
  collection : 'formacion'
}
);


module.exports = mongoose.model('formacion', formacionSchema);
