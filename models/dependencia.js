var mongoose              = require('mongoose'),
    Schema                = mongoose.Schema;

var dependenciaSchema = new Schema({
  id:     {
            type: String
          },
  dependencia:  {
            type: String
          }
},
{
  collection : 'dependencia_unidad'
});

module.exports = mongoose.model('dependencia', dependenciaSchema);
