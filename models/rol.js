var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var rolSchema = new Schema({
  id: { type: String },
  value: { type: String },
  text: { type: String }
},
{
  collection : 'rol_usuario'
}
);

module.exports = mongoose.model('rol', rolSchema);
