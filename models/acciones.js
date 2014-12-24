var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var accionesSchema = new Schema({
  //id: { type: String },//NECESARIO
  registro_date:                            { type: Date, default: Date.now },
  estatus_accion:                           {type: String, default: "Pendiente"},
  dependencia:                              String ,
  unidad:                                   String ,
  dirigido_a:                               String,
  dirigido_a_tipo:                          String,
  nombre_institucion:                       String,
  dirigido_a_dependencia:                   String,
  nombre_accion_Formacion:                  String,
  tipo_accion_Formacion:                    String,
  modalidad_accion_Formacion:               String,
  horas_presencial:                         String,
  horas_linea:                              String,
  modalidad_fecha_inicio:                   String,
  modalidad_fecha_fin:                      String,
  modalidad_hora_inicio:                    String,
  modalidad_hora_fin:                       String,
  perfil_facilitador:                       String,
  perfil_participante:                      String,
  active_coparticipacion:                   String,
  coparticipacion_convenio:                 String,
  coparticipacion_institucion_validante:    String ,
  coparticipacion:[
  {
    nombre:                                 String
  }],
  estatus_sec_1:                            String,//Primer apartado de acciones de formacion
  justificacion:                            String,
  finalidad:                                String,
  area_dirigido_accion:                     String,
  subarea_dirigido_accion:                  String,
  estatus_sec_2:                            String,//Segundo apartado de acciones de formacion
  competencia:                              String,
  resultado_apredizaje_propuesto:[{
    logro:                                  String
  }],
  metodologia_didactica:                    String,
  metodologia_resultado:                    String,
  lineamientos_acreditacion:                String,
  estatus_sec_3 :                           String,//Tercer apartado de acciones de formacion
  planeacion_didactica:[{
      aprendizajes_esperados:               String,
      tiempo_hrs:                           String,
      tiempo_min:                           String,
      contenido:                            String,
      referencias:                          String
  }],
  estatus_sec_4 :                           String //Cuarto apartado de acciones de formacion

},
{
  collection : 'acciones_formacion'
}
);

module.exports = mongoose.model('acciones', accionesSchema);
