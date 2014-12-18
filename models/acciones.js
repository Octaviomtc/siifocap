var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var accionesSchema = new Schema({
  id: { type: String },
  registro_date: { type: Date, default: Date.now },
  estatus_accion: {type: String, default: "Pendiente"},
  dependencia: { type: String },
  unidad: { type: String },
  dirigido_a: { type: String},
  dirigido_a_tipo: {type: String},
  nombre_institucion: {type: String},
  dirigido_a_dependencia: {type: String},
  nombre_accion_Formacion: {type: String},
  tipo_accion_Formacion: {type: String},
  modalidad_accion_Formacion: {type: String},
  horas_presencial: {type: String},
  horas_linea: {type: String},
  modalidad_fecha_inicio: {type: String},
  modalidad_fecha_fin: { type: String },
  modalidad_hora_inicio: { type: String },
  modalidad_hora_fin: { type: String },
  perfil_facilitador: { type: String },
  perfil_participante:{ type: String },
  active_coparticipacion: { type: String },
  coparticipacion_convenio: { type: String },
  coparticipacion_institucion_validante: { type: String },
  coparticipacion:[{
      nombre: { type: String }
  }],
  estatus_sec_1 : {type: String},//Primer apartado de acciones de formacion
  justificacion : {type: String},
  finalidad: {type: String},
  area_dirigido_accion: {type: String},
  subarea_dirigido_accion: {type: String},
  estatus_sec_2 : {type: String}
},
{
  collection : 'acciones_formacion'
}
);

module.exports = mongoose.model('acciones', accionesSchema);
