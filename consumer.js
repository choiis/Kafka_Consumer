/**
 * http://usejsdoc.org/
 */
const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const Offset = kafka.Offset;
const Client = kafka.KafkaClient;

const client = new Client({ kafkaHost: '192.168.25.246:9092' });

const process = require('process');

const arg = process.argv;
const dbType = arg[2];
console.log(dbType);

let topics;
let dbconn;
if (dbType === "oracle") {
	topics = [{topic: 'errorLogs', partition: 0}];
	dbconn = require('./oracle');
} else if (dbType === "mssql") {
	topics = [{topic: 'serverLogs', partition: 0}];
	dbconn = require('./mssql');
}
const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

const consumer = new Consumer(client, topics, options);
const offset = new Offset(client)

consumer.on("message", (message) => {
	if (dbType === "oracle" && message.topic === "errorLogs") { 
		console.log("errorLogs : " + message.value);	
		dbconn.insertSql(message.value);
	} else if (dbType === "mssql" && message.topic === "serverLogs") {
		console.log("serverLogs : " + message.value);
		dbconn.insertSql(message.value);
	}
});

consumer.on('error', (err) => {
	console.log('error:', err);
});

consumer.on('offsetOutOfRange', (err) => {
    console.log('offsetOutOfRange:',err);
});

process.on('uncaughtException', function(err) {
	console.error(err);
});

process.on('unhandledRejection' , (reason , p) => {
	console.error(reason, 'Unhandled Rejection at Promise', p);
});