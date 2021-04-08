const mssql = require('mssql');
import * as fs from 'fs';
import logger from './logger';

class Dao {

    private readonly mssql;

    constructor() {
        fs.readFile('src/mssql.properties', 'utf8', function(err, data:any) {

            const json:any = JSON.parse(data);
            const config = {
                user : json.user,
                password : json.password,
                server : json.server,
                port : json.port,
                database : json.database
            };
            
            mssql.connect(config).then(() => {
                logger.debug("SQL Server connection success");
            }).catch((err) => {
                logger.error(err);
            });
        });
        
    }

    public insertSql = ( async (sql:string) => {
        const request = new mssql.Request();
        logger.debug("insertSql " + sql);
        const data = await request.query(sql)
        .then(() => {
            return 1;
        })
        .catch((err) => {
            logger.error(err);
        });
        return data;
    });

}

module.exports.Dao = Dao;