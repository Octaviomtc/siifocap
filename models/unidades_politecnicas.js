var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var unidadesSchema = new Schema({
    dependencia: { type: String },
    clave: { type: String },
    nombre: { type: String },
    siglas: { type: String },
    mail: { type: String },
    responsable: { type: String },
    extension: { type: String },
    cargo: { type: String },
    direccion: { type: String},
    codigo: { type: String, default: "000"}
},
{
  collection : 'unidades_politecnicas'
}
);

module.exports = mongoose.model('unidades_politecnicas', unidadesSchema);
