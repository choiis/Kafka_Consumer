const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const Offset = kafka.Offset;
const Client = kafka.KafkaClient;

const client = new Client({ kafkaHost: '127.0.0.1:9092' });
const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
const topics = [{topic: 'errorLogs', partition: 0}];
const consumer = new Consumer(client, topics, options);
const offset = new Offset(client)


module.exports.consumer = consumer;