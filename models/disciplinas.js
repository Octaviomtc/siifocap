var mongoose              = require('mongoose'),
    Schema                = mongoose.Schema;

var disciplinasSchema = new Schema({
  id:     {
            type: String
          },
  disciplina:  {
            type: String
          }
},
{
  collection : 'disciplinas'
});

module.exports = mongoose.model('disciplinas', disciplinasSchema);
