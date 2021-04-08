//src/index.ts
import logger from './logger';
const process = require('process');
const dbconn = require('./mssql');
const kafka = require('./kafka');


kafka.consumer.on('message', (message) => {
  logger.debug('consumer message');
  dbconn.insertSql(message.value);
});

kafka.consumer.on('error', (err) => {
  logger.debug('consumer message');
  logger.error('error:', err);
});

kafka.consumer.on('offsetOutOfRange', (err) => {
  logger.debug('consumer offsetOutOfRange');
  logger.error('offsetOutOfRange:',err);
});

process.on('uncaughtException', (err) => {
  logger.error(err);
});

process.on('unhandledRejection' , (reason , p) => {
  logger.error(reason, 'Unhandled Rejection at Promise', p);
});