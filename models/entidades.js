var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var entidadesSchema = new Schema({
  nombre: String,
  abr:    String
},
{
  collection : 'entidades'
}
);


module.exports = mongoose.model('entidades', entidadesSchema);
