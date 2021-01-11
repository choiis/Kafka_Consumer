const mssql = require('mssql');
const fs = require('fs'); // 파일목록 탐색

fs.readFile('mssql.properties', 'utf8', function(err, data) {
	let json = JSON.parse(data);

	let config = {
		user : json.user,
		password : json.password,
		server : json.server,
		port : json.port,
		database : json.database
    };
    
    mssql.connect(config).then(() => {
        console.log("SQL Server connection success");
    }).catch((err) => {
		console.log(err);
    });
});

let insertSql = ( async (sql) => {
    let request = new mssql.Request();

    let data = await request.query(sql)
    .then(() => {
        return 1;
    })
    .catch((err) => {
        console.log(err);
    });
    
    return data;
});

module.exports.mssql = mssql;
module.exports.insertSql = insertSql;