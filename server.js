/* --Requires-- */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var formidable = require('formidable');
var util = require('util');
var Patients = require('./server/models/patients');
var DbHandler = require('./server/mongodb/dbHandler');

var app = express();
var port = 8089;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendfile('app/index.html');
});

app.use(express.static(__dirname+"/app"));
app.use('/api', router);

router.get("/",function(req,res){
	res.json({ message: 'Api up and running !' });	
});

router.post("/addPatient",function(req,res){
	var form = new formidable.IncomingForm();
	var patient = new Patients();
	var fileBuffer;
	form.onPart = function (part) {
        if(!part.filename){
            form.handlePart(part);
            return;
        }
        part.on('data', function(buffer){
        	if(fileBuffer === undefined){
        		fileBuffer = buffer;
        	}
        	else{
        		fileBuffer = Buffer.concat([fileBuffer, buffer]);
        	}   
        });
        part.on('end', function() {
			patient.attachments.push(fileBuffer);
        });
    };
    form.parse(req, function(err, fields, files) {  
		patient.name = fields.name;
		patient.age = fields.age;
		patient.visitingdate = fields.visitingdate;
		patient.doctorname = fields.doctorname;
		patient.hospitalname = fields.hospitalname;
		console.log(util.inspect({fields: fields, files: files}));
    });
    form.on('end', function(fields, files) {
    	DbHandler.savePatient(req,res,patient);
    });
});

router.get("/getPatient",function(req,res){
	DbHandler.getAllPatients(req,res);
});

app.listen(port);
console.log('Server Started on port ' + port);
console.log(DbHandler.test());