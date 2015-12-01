var mongoose          = require('mongoose');
var moment            = require('moment');
var Schema            = mongoose.Schema;


var dictaminacion_schema = new Schema({
  puntaje:                  { type: Number, default: 0 },
  pregunta: [{
    respuesta:              Number,
    comentario:             String
  }],
  
  tecnico:[{
      granTotal:{ type: Number },
      totalIII:{ type: Number },
      totalII:{ type: Number },
      totalI:{ type: Number},
      select1:{ type: Number},
      select2:{ type: Number},
      select3:{ type: Number},
      "select3-2":{ type: Number},
      select4:{ type: Number},
      select5:{ type: Number},
      select6:{ type: Number},
      select7:{ type: Number},
      select8:{ type: Number},
      select9:{ type: Number},
      select10:{ type: Number},
      "select10-2":{ type: Number},
      select11:{ type: Number},
      "select11-2":{ type: Number},
      select12:{ type: Number},
      "select12-2":{ type: Number},
      "select12-3":{ type: Number},
      "select12-4":{ type: Number},
      select13:{ type: Number},
      select14:{ type: Number},
      select15:{ type: Number},
      "select15-2":{ type: Number},
      "select15-3":{ type: Number},
      select16:{ type: Number},
      "select16-2":{ type: Number},
      "select16-3":{ type: Number},
      "select16-4":{ type: Number},
      "select16-5":{ type: Number},
      select17:{ type: Number},
      "select17-2":{ type: Number},
      "select17-3":{ type: Number},
      "select17-4":{ type: Number},
      select18:{ type: Number},
      "select18-2":{ type: Number},
      "select18-3":{ type: Number},
      selectA:{ type: Number},
      selectB:{ type: Number},
      "selectB-2":{ type: Number},
      selectC:{ type: Number},
      selectD:{ type: Number},
      "selectD-2":{ type: Number},
      "selectD-3":{ type: Number},
      "selectD-4":{ type: Number},
      "selectD-5":{ type: Number},
      "selectD-6":{ type: Number},
      selectE:{ type: Number},
      "selectE-2":{ type: Number},
      "selectE-3":{ type: Number},
      "selectE-4":{ type: Number},
      selectF:{ type: Number},
      "selectF-2":{ type: Number},
      "selectF-3":{ type: Number},
      selectG:{ type: Number},
      "selectG-2":{ type: Number},
      "selectG-3":{ type: Number},
      selectH:{ type: Number},
      "selectH-2":{ type: Number},
      selectI:{ type: Number},
      selectJ:{ type: Number},
      "txta1": { type: String},
      "txta2":  { type: String},
      "txta3":  { type: String},
      "txta3-2":  { type: String},
      "txta4":  { type: String},
      "txta5":  { type: String},
      "txta6":  { type: String},
      "txta7":  { type: String},
      "txta8":  { type: String},
      "txta9":  { type: String},
      "txta10":  { type: String},
      "txta10-2":  { type: String},
      "txta11":  { type: String},
      "txta11-2":  { type: String},
      "txta12":  { type: String},
      "txta12-2":  { type: String},
      "txta12-3":  { type: String},
      "txta12-4":  { type: String},
      "txta13":  { type: String},
      "txta14":  { type: String},
      "txta15":  { type: String},
      "txta15-2":  { type: String},
      "txta15-3":  { type: String},
      "txta16":  { type: String},
      "txta16-2":  { type: String},
      "txta16-3":  { type: String},
      "txta16-4":  { type: String},
      "txta16-5":  { type: String},
      "txta17":  { type: String},
      "txta17-2":  { type: String},
      "txta17-3":  { type: String},
      "txta17-4":  { type: String},
      "txta18":  { type: String},
      "txta18-2":  { type: String},
      "txta18-3":  { type: String},
      "txtaA":  { type: String},
      "txtaB":  { type: String},
      "txtaB-2":  { type: String},
      "txtaC":  { type: String},
      "txtaD":  { type: String},
      "txtaD-2":  { type: String},
      "txtaD-3":  { type: String},
      "txtaD-4":  { type: String},
      "txtaD-5":  { type: String},
      "txtaD-6":  { type: String},
      "txtaE":  { type: String},
      "txtaE-2":  { type: String},
      "txtaE-3":  { type: String},
      "txtaE-4":  { type: String},
      "txtaF":  { type: String},
      "txtaF-2":  { type: String},
      "txtaF-3":  { type: String},
      "txtaG":  { type: String},
      "txtaG-2":  { type: String},
      "txtaG-3":  { type: String},
      "txtaH":  { type: String},
      "txtaH-2":  { type: String},
      "txtaI":  { type: String},
      "txtaJ":  { type: String},
      dictamen:{ type: String },
      fecha: { type: Date, default: Date.now }
  }],
  facilitador:[{
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
  }],
  academica:[{
    "selectAcademica1": { type: Number },
    "sumaA": { type: Number },
    "selectAcademica2": { type: Number },
    "selectAcademica3":{ type: Number },
    "sumaB": { type: Number },
    "selectAcademica4": { type: Number },
    "selectAcademica5": { type: Number },
    "selectAcademica6": { type: Number },
    "selectAcademica7": { type: Number },
    "sumaC": { type: Number },
    "selectAcademica8": { type: Number },
    "sumaD": { type: Number },
    "selectAcademica9": { type: Number },
    "selectAcademica10": { type: Number },
    "sumaE": { type: Number },
    "selectAcademica11": { type: Number },
    "selectAcademica12": { type: Number },
    "sumaF": { type: Number },
    "selectAcademica13": { type: Number },
    "selectAcademica14": { type: Number },
    "sumaG": { type: Number },
    "Dictamen": { type: String },
    "txtFirma": { type: String }

  }]
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

var programacion_schema = new Schema(
  {
    createDate:           {type: Date, default: new Date()},
    periodo_inicio:       Date,
    periodo_fin:          Date,
    maximo:               {type: Number, default: 0},
    estatus: {type: String, default: "programada"},
    calendario:   {
      lunes: {type: String, default: 'NO'},
      lunesInicio: {type: String, default: '00:00'},
      lunesFin: {type: String, default: '00:00'},
      martes: {type: String, default: 'NO'},
      martesInicio: {type: String, default: '00:00'},
      martesFin: {type: String, default: '00:00'},
      miercoles: {type: String, default: 'NO'},
      miercolesInicio: {type: String, default: '00:00'},
      miercolesFin: {type: String, default: '00:00'},
      jueves: {type: String, default: 'NO'},
      juevesInicio: {type: String, default: '00:00'},
      juevesFin: {type: String, default: '00:00'},
      viernes: {type: String, default: 'NO'},
      viernesInicio: {type: String, default: '00:00'},
      viernesFin: {type: String, default: '00:00'},
      sabado: {type: String, default: 'NO'},
      sabadoInicio: {type: String, default: '00:00'},
      sabadoFin: {type: String, default: '00:00'}
    },
    hora_inicio: {type: String, default: '00:00'},
    hora_fin: {type: String, default: '00:00'},
    horarioMultiple: {type: String, default: 'NO'},

    sede: {type: String, default: ''},
    escolarizada_dias:    String,
    escolarizada_fechas:  {
      fecha:    Date
    },
    escolarizada_horario: {
      dia:      String,
      horas:    String
    },
    escolarizada_sede:    String,
    mixta_dias:           String,
    mixta_fechas:         {
      fecha:    Date
    },
    mixta_horario:        {
      dia:      String,
      horas:    String
    },
    mixta_sede:           String,
    mixta_online:         { type: String, default: "Moodle" },
    no_escolarizada_periodo: String,
    no_escolarizada_plataforma: { type: String, default: "Moodle" }

  }
);

var accionesSchema = new Schema({
  //id: { type: String },//NECESARIO
  status:                                 { type: Number, default: 0 },
  cur:{
      titulo        : {type: String, default: 'CGFIE'},
      anio          : {type: Number},
      estado        : {type: Number},
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
  cur_gen:                                  {type: String, default: 'No asignada'},
  dictaminacion:                            [dictaminacion_schema],
  puntaje_dictaminado:                      { type: Number, default: 0 },
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
  active_coparticipacion_val:               {type: String, default: "off"},
  coparticipacion_convenio:                 String,
  coparticipacion_institucion_validante:    String,
  coparticipacion:                          [coparticipacion_schema],
  estatus_sec_1:                            {type: String, default: "false"},//Primer apartado de acciones de formacion
  justificacion:                            String,
  finalidad:                                String,
  area_dirigido_accion:                     String,
  subarea_dirigido_accion:                  String,
  estatus_sec_2:                            {type: String, default: "false"},//Segundo apartado de acciones de formacion
  competencia:                              String,
  resultado_apredizaje_propuesto:           [resultado_apredizaje_propuesto_schema],
  metodologia_didactica:                    String,
  metodologia_resultado:                    String,
  lineamientos_acreditacion:                String,
  estatus_sec_3 :                           {type: String, default: "false"},//Tercer apartado de acciones de formacion
  planeacion_didactica:                     [planeacion_didactica_schema],
  estatus_sec_4 :                           {type: String, default: "false"}, //Cuarto apartado de acciones de formacion
  programacion:                             [programacion_schema]

},
{
  collection : 'acciones_formacion'
}
);


module.exports = mongoose.model('acciones', accionesSchema);
