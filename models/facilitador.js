
var mongoose = require('mongoose');

module.exports = mongoose.model('facilitador',{
  nombre:        String,
  apellidos:     String,
  curp:          String,
  rfc:           String,
  domicilio:     String,
  colonia:       String,
  delegacion:    String,
  cp:            String,
  entidad:        String,
  personal_IPN:  Boolean,
  datos_personal_IPN:{
    fecha_ingreso: Date,
    numero_empleado: String,
    unidad: String,
    centro: String
  },
  contratacion_honorarios: Boolean,
  contacto:{
    telefono: String,
    movil:    String,
    trabajo:  String,
    extension: String
  },
  email:
  {
    institucional: String,
    alternativo:   String,
    check:         String
  }
});