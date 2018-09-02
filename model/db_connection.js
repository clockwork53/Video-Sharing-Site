const mysql = require('mysql');

const connection = mysql.createConnection({
	host	:	'localhost',
	user	:	'root',
	password:	'',
	database:	"medi_vid_upload"
});

module.exports = connection;