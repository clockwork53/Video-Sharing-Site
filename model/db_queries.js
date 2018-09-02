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
					callback(err,-1);
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
