/**
 * http://usejsdoc.org/
 */
const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const Offset = kafka.Offset;
const Client = kafka.KafkaClient;

const client = new Client({ kafkaHost: '192.168.25.246:9092' });
const topics = [{topic: 'errorLogs', partition: 0}];
const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

const consumer = new Consumer(client, topics, options);
const offset = new Offset(client)

const oracle = require('./oracle');
const process = require('process');

consumer.on("message", (message) => {
	if (message.topic === "errorLogs") { 
		console.log("errorLogs : " + message.value);	
		oracle.insertSql(message.value);
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