const { Kafka } = require('kafkajs')
const { config } = require('dotenv');
config();

exports.kafka = new Kafka({
  clientId: 'my-app',
  brokers: process.env.BROKERS.split(','),
});