const ampq = require("amqplib/callback_api");
const { queue } = require("../config");
const parser = require("../utils/parseQuery");
const consumer = require("../consumer");

ampq.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    console.log(
      `Listening to the queue ${queue}...\nRun 'npm run producer' to send a message to the broker!`
    );
    channel.assertQueue(queue);
    channel.consume(queue, msg => {
      const query = parser(msg.content.toString());
      const parsed = JSON.parse(query);
      consumer(parsed, msg.fields.deliveryTag);
    });
  });
});
