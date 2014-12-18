var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var escuelaSchema = new Schema({
  id: { type: String },
  clave: { type: String },
  nombre: { type: String },
  siglas: { type: String },
  email: { type: String },
  dependencia: { type: String },
  responsable: { type: String },
  extension: { type: String },
  cargo: { type: String },
  direccion: { type: String}   
},
{
  collection : 'unidades_politecnicas'
}
);

module.exports = mongoose.model('escuela', escuelaSchema);
