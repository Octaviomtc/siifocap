var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var evaluadoresSchema = new Schema({
  registro_date                           :{type: Date, default: Date.now },
  nombre                                  :String,
  apellidos                               :String,
  curp                                    :String,
  calle                                   :String,
  interior                                :String,
  colonia                                 :String,
  delegacion                              :String,
  cp                                      :String,
  entidad                                 :String,
  tipo                                    :String,

  tipo_ipn:{
    fecha_ingreso_ipn                       :String,
    empleado_ipn                            :String,
    dependencia                             :String,
    unidad                                  :String,
    tipo_contratacion                       :String,
    funcion                                 :String,
    correo_ipn                              :String,
    correo_alternativo                      :String,
    tel_particular                          :String,
    tel_trabajo                             :String,
    tel_extension                           :String
  },

  tipo_externo:{
    institucion                             :String,
    correo                                  :String,
    telefono                                :String
  },
  estatus_sec_1                           :String,



  formacion_academica                     :String,
  formacion_academica_especifico          :String,
  formacion_academica_carrera             :String,
  institucion_realizacion_estudios        :String,
  entidad_federativa                      :String,
  tipo_institucion                        :String,
  escuela_publica                         :String,
  escuela_privada                         :String,
  complemtario                            :[{disciplina: String, institucion_formadora: String }],
  cedula_profesional                      :String,
  documentacion_probatoria                :String,
  estatus_sec_2                           :String,




  estatus_sec_3                           :String,
  estatus_sec_4                           :String,
  estatus_sec_5                           :String
},
{
  collection : 'evaluadores'
}
);


module.exports = mongoose.model('evaluadores', evaluadoresSchema);
