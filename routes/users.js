const express = require('express');
const router = express.Router();
const db = require('../model/db_queries');
const validator = require('validator');
const passwordValidator = require('password-validator');


//TODO: use passport library for authentication

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
			if (!err) {
				console.log(username + privilege);
				req.session.username = username;
				req.session.privilege = privilege;
				res.json({'error': false});
			} else {
				res.json({'error': err});
			}
		});
	}
});

/* POST signup */
router.post('/signup',(req, res) => {
	let bodyEmpty = validator.isEmpty(req.body.username);
	let usernameValid = validator.isAlphanumeric(req.body.username);
	let usernameLength = validator.isLength(req.body.username, 5, 20);
	let passwordUncommon = passcheck.validate(req.body.password, {list: false});
	let emailValid = validator.isEmail(req.body.email);
	let fNameValid = validator.isAlpha(req.body.fName);
	let fNameLength = validator.isLength(req.body.fName, 2, 15);
	let lNameValid = validator.isAlpha(req.body.lName);
	let lNameLength = validator.isLength(req.body.lName, 2, 15);
	let telNumValid = validator.isNumeric(req.body.telNum);

	if( !bodyEmpty && usernameValid && usernameLength
		&& passwordUncommon && emailValid && fNameValid
		&& fNameLength && lNameValid &&	lNameLength && telNumValid
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
			if(err && err.sqlMessage.includes("Duplicate entry")) {
				if (err.sqlMessage.includes("email"))
					res.json({'error': "Duplicate Email", 'status': status});
				if (err.sqlMessage.includes("username"))
					res.json({'error': "Duplicate Username", 'status': status});
			}
			else
				res.json({'error': false, 'status': status});
		});
	}else {
		res.json({
			'error': 'notFatal',
			'bodyEmpty': bodyEmpty,
			'usernameInvalid': !usernameValid || !usernameLength,
			'passwordCommon': !passwordUncommon,
			'emailInvalid': !emailValid,
			'fNameInvalid': !fNameLength || !fNameValid,
			'lNameInvalid': !lNameLength || !lNameValid,
			'telInvalid': !telNumValid
		});
	}
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


module.exports = router;
