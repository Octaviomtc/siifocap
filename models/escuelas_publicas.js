var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var escuelaPublicasSchema = new Schema({
  entidad: { type: String },
  nombre: { type: String }
},
{
  collection : 'escuelas_publicas'
}
);

module.exports = mongoose.model('escuelas_publicas', escuelaPublicasSchema);
