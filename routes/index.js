const validator = require('validator');
const passwordValidator = require('password-validator');
const express = require('express');
const router = express.Router();
const db = require('../model/db_queries');

 /*
 * 	set conditions for password
 * */
let passcheck = new passwordValidator();
passcheck.is().min(6)
	.is().max(20)
	.has().not().spaces()
	.is().not().oneOf(['1234567']);

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
/* POST logout*/
router.post('/logout',(req, res)=>{
	req.session.destroy((err)=>{
		if(err)
			console.log(err);
		else
			res.redirect('/');
	})
});

/* POST upload*/
router.post('/upload', (req, res)=>{
	console.log(req.body);
	if(
		true
	){
		let Video ={
			title = req.body.
		};
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index',
		{title : 'Suranus', username : req.session.username ,
		bCanUpload: req.session.privilege===1 ,errorStatus: req.session.error});
});


module.exports = router;
