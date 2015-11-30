var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var dictaminacionSchema = new Schema({
  accion_id: { type: String },
  pregunta: [{
    respuesta: { type: Number },
    comentario: { type: String }
  }],
  facilitador:{
    
    selectfac1:{ type: String },
    txtafac1:{ type: String },    
    selectfac2:{ type: String },
    txtafac2:{ type: String },    
    selectfac3:{ type: String },
    txtafac3:{ type: String },    
    selectfac4:{ type: String },
    txtafac4:{ type: String },
    selectfac5:{ type: String },
    txtafac5:{ type: String },

    dictamen:{ type: String },
    fecha: { type: Date, default: Date.now },
    evaluador:{ type: String }
  },
  puntaje: {type: Number}

},
{
  collection : 'dictaminacion'
}
);

module.exports = mongoose.model('dictaminacion', dictaminacionSchema);