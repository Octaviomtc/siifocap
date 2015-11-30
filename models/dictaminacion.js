var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var dictaminacionSchema = new Schema({
  accion_id: { type: String },
  pregunta: [{
    respuesta: { type: Number },
    comentario: { type: String }
  }],
  facilitador:[
    pregunta: {type:String},
    respuesta: { type: Number },
    comentario: { type: String }
  ],
  academica:[
    pregunta: {type:String},
    respuesta: { type: Number },
    comentario: { type: String }
  ]
  puntaje: {type: Number}

},
{
  collection : 'dictaminacion'
}
);

module.exports = mongoose.model('dictaminacion', dictaminacionSchema);
