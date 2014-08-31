var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PatientSchema   = new Schema({
	name: {type: String, required: true},
	age: {type: Number, required: true},
	visitingdate:{type: Date, required: true, default: new Date()},
	doctorname: {type: String, required: true},
	hospitalname: {type: String, required: true},
	attachments: [Buffer]
});

module.exports = mongoose.model('Patients', PatientSchema);