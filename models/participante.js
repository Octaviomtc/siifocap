
var mongoose = require('mongoose');

module.exports = mongoose.model('participante',{
  nombre:         String,
  apellidos:      String,
  noempleado:    String,
  curp:           String,
  rfc:            String,
  genero:         String,
  entidad:        String,
  dependencia:         String,
  unidad:         String,
  email_inst:     String,
  email_pers:     String,
  telefono:       String,
  celular:        String,
  usuario:        String,
  password:       String,
  grupo:          String,
  accion:         String
});
