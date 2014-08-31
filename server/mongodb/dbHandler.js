var mongoose = require('mongoose');
var Patients = require('../models/patients');

mongoose.connect('mongodb://localhost/myapp');

var savePatient = function(req,res,patient){
	patient.save(function(err) {
		if (err){
			res.json({ status: 'Error', message: err });
		}
		res.json({ status: 'Success' });
	});
};

var getAllPatients = function(req,res){
	Patients.find(function(err, patients) {
		if (err){
				res.json({ status: 'Error', message: err });
		}
		res.json(patients);
	});
};

var test = function(){
	return {status: 'Module DB Handler added'};
}

exports.savePatient = savePatient;
exports.getAllPatients = getAllPatients;
exports.test = test;