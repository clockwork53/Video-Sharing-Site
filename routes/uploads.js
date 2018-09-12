const express = require('express');
const router = express.Router();
const db = require('../model/db_queries');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

// multer setup
const multerConfig = {

	storage: multer.diskStorage({
		//Setup where the user's file will go
		destination: function(req, file, next){
			next(null, './public/video-storage');
		},

		//Then give the file a unique name
		filename: function(req, file, next){
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
			next(null, true);
		}else{
			console.log("file not supported");

			//TODO:  A better message response to user on failure.
			return next();
		}
	}
};
/* POST upload*/
router.post('/videoUpload', multer(multerConfig).single('file'), (req, res)=>{
	console.log(req.body);
	if(
		//TODO: check conditions for file upload
		true
	){
		let videoHandle = ffmpeg(__dirname + '\\..\\public\\video-storage\\' + req.file.filename);
		videoHandle.ffprobe((err,data)=> {
			if(!err){
				let Video ={
					username: req.body.username,
					title: req.body.title,
					keywords: req.body.keywords,
					category: req.body.category,
					doctor: req.body.doctor,
					description: req.body.description,
					fileAddr: req.file.filename,
					fileLength: data.format.duration
				};
				db.upload_video(Video, (err)=>{
					res.error = err;
					res.redirect('/');
				});
			}else
				res.json({'error': err});
		});

	}
});

module.exports = router;