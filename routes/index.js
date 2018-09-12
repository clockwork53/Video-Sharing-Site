const express = require('express');
const router = express.Router();
const db = require('../model/db_queries');
const ffmpeg = require('fluent-ffmpeg');
const default_video_thumbs = {thumb: 'images/infinite-loader.gif', length: '4:20', title: ';)', views: 'Nan'};

/* GET recent videos*/
router.get('/getRecentVideo', (req,res)=> {
	db.getRecentVideo(0, 2, (err, rows)=> {
		if(!err){
			let result = [];
			for (let i = 0; i < rows.length; i++) {
				result.push({
					'title': rows[i].title,
					'description': rows[i].description,
					'link': rows[i].perma_link,
					'keywords': rows[i].keywords,
					'doctor': rows[i].doctor_name,
					'length': rows[i].length,
					'views': 15000});
			}
			res.json(JSON.stringify(result));
		}
	})
});

/* GET home page. */
router.get('/', (req, res, next)=> {

	res.render('index',
		{title : 'Suranus', username : req.session.username ,
		bCanUpload: req.session.privilege===1 ,errorStatus: req.session.error,
		video:default_video_thumbs});
});


module.exports = router;
