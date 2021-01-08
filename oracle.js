

const oracledb = require('oracledb');
const fs = require('fs'); // 파일목록 탐색
oracledb.autoCommit = true;

const conn;

fs.readFile('oracle.properties', 'utf8', (err, data) => {
	let json = JSON.parse(data);
	let config = {
		user: json.user,
		password: json.password,
		connectString: json.connectString
	};

	// Global connection으로 만듬
	oracledb.getConnection(config, (err, con) => {
		if (err == null) {
			console.log("Oracle connection success");
			conn = con;
		}
	});
});


var insertSql = ( async (sql) => {
	if(conn != null) {
		//쿼리문 실행 
		let data = await conn.execute(sql).then(() => {
			return 1;
		}).catch((err) => {
			console.log(err);
		});
		return data;
	}
});

module.exports.insertSql = insertSql;