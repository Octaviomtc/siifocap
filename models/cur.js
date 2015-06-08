var mongoose              = require('mongoose'),
    Schema                = mongoose.Schema;

var curSchema = new Schema({
	def: String,
	curso: Number,
	taller: Number,
	seminario: Number,
	diplomado: Number
},
{
  collection : 'cur'
});



module.exports = mongoose.model('curSchema', curSchema);
