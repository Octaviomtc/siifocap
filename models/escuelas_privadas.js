var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var escuelaPrivadaSchema = new Schema({
  entidad: { type: String },
  nombre: { type: String }
},
{
  collection : 'escuelas_privadas'
}
);

module.exports = mongoose.model('escuelas_privadas', escuelaPrivadaSchema);
