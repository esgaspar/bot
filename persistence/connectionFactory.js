var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			port: '3306',
			user: 'admin',
			password: 'admin',
			database: 'dbbot'
		});
}

module.exports = function() {
	return createDBConnection;
}
