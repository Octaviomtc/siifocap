var mongoose = require('mongoose');

module.exports = mongoose.model('Cur',{
	id: String,
	def: String,
	do: Number,
	di: Number,
	tr: Number
});