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
		return -1;
	else{
		connection.query("SELECT * FROM users WHERE username = ? AND password = ?",
			[user.username, user.password],
			(err, rows) =>{
				if(!rows[0]) {
					callback(-1);
				}else {
					callback(err, rows[0].username, rows[0].type);
				}
		});
	}
};

exports.register_db = function register_db(user, callback) {
	if(!bConnected)
		return -1;
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
		return -1;
	else{
		connection.query("SELECT type, uuid FROM users WHERE username = ?",
			[video.username],
			(err, rows)=> {
				if (err)
					callback(err);
				else if(!(rows[0].type === 1))
					callback('You are not Authorized to upload Videos');
				else if (!err && rows[0].type === 1) {
					connection.query("INSERT INTO videos (title, category, description, uuid, perma_link, keywords, doctor_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
						[video.title, video.category, video.description, rows[0].uuid, video.fileAddr, video.keywords, video.doctor],
						(err) => {
							callback(err);
					});
				}
		});
	}
};