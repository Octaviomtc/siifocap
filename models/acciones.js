var mongoose          = require('mongoose');
var moment            = require('moment');
var Schema            = mongoose.Schema;


var dictaminacion_schema = new Schema({
  puntaje:                  Number,
  pregunta: [{
    respuesta:              Number,
    comentario:             String
  }],
});



var planeacion_didactica_schema = new Schema(
  {
    aprendizajes_esperados:                 String,
    tiempo_hrs:                             String,
    tiempo_min:                             String,
    contenido:                              String,
    referencias:                            String,
    nombre_actividad:                       String,
    objetivo_actividad:                     String,
    recursos:                               String,
    tiempo_realizacion:                     String,
    evidencia:                              String,
    instrumento_evaluacion:                 String,
    instrumento_otro_evaluacion:            String,
    instrumento_archivo_evaluacion:         String
  }
);


var coparticipacion_schema = new Schema(
  {
    nombre:                                 String
  }
);

var resultado_apredizaje_propuesto_schema = new Schema(
  {
    logro:                                  String
  }
);

var accionesSchema = new Schema({
  //id: { type: String },//NECESARIO
  cur:{
      titulo        : {type: String, default: 'No asignada'},
      anio          : {type: Number},
      consecutivo   : {type: Number},
      terminacion   : {type: String},
      personal      : {type: String},
      tipo          : {type: String},
      costo         : {type: String},
      modalidad     : {type: String},
      unidad_res    : {type: String},
      vigencia      : {type: String},
      cur           : {type: String}
    },
  dictaminacion:                            [dictaminacion_schema],
  registro_date:                            {type: Date, default: Date.now },
  estatus_accion:                           {type: String, default: "Pendiente"},
  dependencia:                              String,
  unidad:                                   String,
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
  active_coparticipacion:                   Boolean,
  coparticipacion_convenio:                 String,
  coparticipacion_institucion_validante:    String,
  coparticipacion:                          [coparticipacion_schema],
  estatus_sec_1:                            String,//Primer apartado de acciones de formacion
  justificacion:                            String,
  finalidad:                                String,
  area_dirigido_accion:                     String,
  subarea_dirigido_accion:                  String,
  estatus_sec_2:                            String,//Segundo apartado de acciones de formacion
  competencia:                              String,
  resultado_apredizaje_propuesto:           [resultado_apredizaje_propuesto_schema],
  metodologia_didactica:                    String,
  metodologia_resultado:                    String,
  lineamientos_acreditacion:                String,
  estatus_sec_3 :                           String,//Tercer apartado de acciones de formacion
  planeacion_didactica:                     [planeacion_didactica_schema],
  estatus_sec_4 :                           String //Cuarto apartado de acciones de formacion

},
{
  collection : 'acciones_formacion'
}
);


module.exports = mongoose.model('acciones', accionesSchema);
