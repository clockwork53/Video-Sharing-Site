const validator = require('validator');
const passwordValidator = require('password-validator');
const express = require('express');
const router = express.Router();
const db = require('../model/db_queries');
const multer = require('multer');
//TODO: use passport library for authentication
 /*
 * 	set conditions for password
 * */
let passcheck = new passwordValidator();
passcheck.is().min(6)
	.is().max(20)
	.has().not().spaces()
	.is().not().oneOf(['1234567']);
//TODO: add guest mode... maybe?
//TODO: Use ajax to let user know what went wrong
/* POST login */
router.post('/login',(req, res) => {

	if(!validator.isEmpty(req.body.username)
		&& validator.isAlphanumeric(req.body.username)
		&&	passcheck.validate(req.body.password, {list: false})
	) {
		let User = {
			username: req.body.username,
			password: req.body.password
		};
		db.login_db(User, (err, username, privilege) => {
			console.log(username + privilege);
			req.session.username = username;
			req.session.privilege = privilege;
			req.session.error = err;
			res.redirect('/');
		});

	}
});
/* POST signup */
router.post('/signup',(req, res) => {
	console.log(req.body);
	if(!(validator.isEmpty(req.body.username))
		&&	validator.isAlphanumeric(req.body.username)
		&&  validator.isLength(req.body.username, 5, 20)
		&&	passcheck.validate(req.body.password, {list: false})
		&&	validator.isEmail(req.body.email)
		&&	validator.isAlpha(req.body.fName)
		&&	validator.isLength(req.body.fName, 2, 15)
		&&	validator.isAlpha(req.body.lName)
		&&	validator.isLength(req.body.lName, 2, 15)
		&&	validator.isNumeric(req.body.telNum)
	){
		let User = {
			username: req.body.username,
			password: req.body.password,
			email:	req.body.email,
			fName:	req.body.fName,
			lName:	req.body.lName,
			telNum:	req.body.telNum,
			alma:	req.body.alma,
			privilege:	3
		};
		db.register_db(User, (err,status)=>{
			req.session.error = err;
			res.redirect('/');
		});
	}else
		console.log('oops');
});
//TODO: check if anyone is actually logged in!
/* POST logout*/
router.post('/logout',(req, res)=>{
	req.session.destroy((err)=>{
		if(err)
			console.log(err);
		else
			res.redirect('/');
	})
});

// multer setup
const multerConfig = {

	storage: multer.diskStorage({
		//Setup where the user's file will go
		destination: function(req, file, next){
			next(null, './public/video-storage');
		},

		//Then give the file a unique name
		filename: function(req, file, next){
			console.log(file);
			const ext = file.mimetype.split('/')[1];
			next(null, file.fieldname + '-' + Date.now() + '.'+ext);
		}
	}),

	//A means of ensuring only images are uploaded.
	fileFilter: function(req, file, next){
		if(!file){
			next();
		}
		const video = file.mimetype.startsWith('video/');
		if(video){
			console.log('video uploaded');
			next(null, true);
		}else{
			console.log("file not supported");

			//TODO:  A better message response to user on failure.
			return next();
		}
	}
};
/* POST upload*/
router.post('/upload', multer(multerConfig).single('file'), (req, res)=>{
	console.log(req.body);
	if(
		//TODO: check conditions for file upload
		true
	){
		let Video ={
			username: req.body.username,
			title: req.body.title,
			keywords: req.body.keywords,
			category: req.body.category,
			doctor: req.body.doctor,
			description: req.body.description,
			fileAddr: req.file.filename
		};
		db.upload_video(Video, (err)=>{
			res.error = err;
			res.redirect('/');
		});
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index',
		{title : 'Suranus', username : req.session.username ,
		bCanUpload: req.session.privilege===1 ,errorStatus: req.session.error});
});


module.exports = router;
