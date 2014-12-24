var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var accionesSchema = new Schema({
  //id: { type: String },//NECESARIO
  registro_date: { type: Date, default: Date.now },
  estatus_accion: {type: String, default: "Pendiente"},
  dependencia:                String ,
  unidad:                     String ,
  dirigido_a:                 String,
  dirigido_a_tipo:            String,
  nombre_institucion:         String,
  dirigido_a_dependencia:     String,
  nombre_accion_Formacion:    String,
  tipo_accion_Formacion:      String,
  modalidad_accion_Formacion: String,
  horas_presencial:           String,
  horas_linea:                String,
  modalidad_fecha_inicio:     String,
  modalidad_fecha_fin:        String,
  modalidad_hora_inicio:      String,
  modalidad_hora_fin:         String,
  perfil_facilitador:         String,
  perfil_participante:        String,
  active_coparticipacion:     String,
  coparticipacion_convenio:   String,
  coparticipacion_institucion_validante: String ,
  coparticipacion:[
  {
      nombre:                 String
  }],
  estatus_sec_1:              String,//Primer apartado de acciones de formacion
  justificacion:              String,
  finalidad:                  String,
  area_dirigido_accion:       String,
  subarea_dirigido_accion:    String,
  estatus_sec_2:              String
},
{
  collection : 'acciones_formacion'
}
);

module.exports = mongoose.model('acciones', accionesSchema);
