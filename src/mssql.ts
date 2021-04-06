const mssql = require('mssql');
import * as fs from 'fs';

fs.readFile('src/mssql.properties', 'utf8', function(err, data) {
	const json = JSON.parse(data);

	const config = {
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
    const request = new mssql.Request();
    console.log("insertSql " + sql);
    const data = await request.query(sql)
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