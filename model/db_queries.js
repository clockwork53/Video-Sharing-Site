const connection = require('./db_connection');

let bConnected = false;

connection.connect(function (err) {
	if(err)
		console.log(err);
	else{
		console.log('DB Connection Successful!');
		bConnected = true
	}
});


exports.login_db = function login_db(user, callback) {
	if (!bConnected)
		callback('DB not connected');
	else{
		connection.query("SELECT * FROM users WHERE username = ? AND password = ?",
			[user.username, user.password],
			(err, rows) =>{
				if(!rows[0]) {
					callback("Username and Password Don't match");
				}else {
					callback(err, rows[0].username, rows[0].type);
				}
		});
	}
};

exports.register_db = function register_db(user, callback) {
	if(!bConnected)
		callback('DB not connected');
	else{
		connection.query("INSERT INTO users (fName, lName, telNum, email, username, password, alma, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			[user.fName, user.lName, user.telNum, user.email, user.username, user.password, user.alma, user.privilege],
			(err)=>{
				callback(err);
		});
	}
};
//TODO: check for duplicates
exports.upload_video = function upload_video(video, callback) {
	if(!bConnected)
		callback('DB not connected');
	else{
		connection.query("SELECT type, uuid FROM users WHERE username = ?",
			[video.username],
			(err, rows)=> {
				if (err)
					callback(err);
				else if(!(rows[0].type === 1))
					callback('You are not Authorized to upload Videos');
				else if (!err && rows[0].type === 1) {
					connection.query("INSERT INTO videos (title, category, description, uuid, perma_link, keywords, doctor_name, length) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
						[video.title, video.category, video.description, rows[0].uuid, video.fileAddr, video.keywords, video.doctor, video.fileLength],
						(err) => {
							callback(err);
					});
				}
		});
	}
};

exports.getRecentVideo = function getRecentVideo(category, limit, callback) {
	if(!bConnected)
		callback('DB not connected');
	else {
		if (category) {
			connection.query("SELECT * FROM videos WHERE category = ? ORDER BY upload_date DESC LIMIT ?",
				[category, limit],
				(err, rows) => {
					if (err)
						callback(err);
					else if (!rows)
						callback('No Recent Videos!');
					else
						callback(null, rows);
				});
		}else{
			connection.query("SELECT * FROM videos ORDER BY upload_date DESC LIMIT ?",
				[limit],
				(err, rows) => {
					if (err)
						callback(err);
					else if (!rows)
						callback('No Recent Videos!');
					else
						callback(null, rows);
				});
		}
	}
}