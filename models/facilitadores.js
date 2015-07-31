var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var complementario_schema = new Schema(
  {disciplina: String, institucion_formadora: String }
);

var facilitadoresSchema = new Schema({
  registro_date                           :{type: Date, default: Date.now },
  nombre                                  :String,
  apellidos                               :String,
  curp                                    :String,
  rfc                                     :String,
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



  ultimo_grado                            :String,
  disciplina_facilitador                  :String,
  institucion_formadora_facilitador       :String,
  complementario                          :[{disciplina: String, institucion_formadora: String }],
  estatus_sec_2                           :String,



  institucion_facilitador                 :String,
  area_departamento                       :String,
  cargo_facilitador                       :String,
  periodo                                 :[{p_institucion: String, p_departamento: String, p_cargo: String }],
  experiencia_institucion                 :String,
  nivel_estudio                           :String,
  area_conocimiento                       :String,
  tematicas_abordadas                     :String,
  modalidad_facilitadores_no              :String,
  estatus_sec_3                           :String,
  


  estatus_sec_4                           :String
},
{
  collection : 'facilitadores'
}
);


module.exports = mongoose.model('facilitadores', facilitadoresSchema);
