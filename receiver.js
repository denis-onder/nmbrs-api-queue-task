const ampq = require("amqplib/callback_api");
const { queue } = require("./config");
const parser = require("./utils/parseQuery");
const consumer = require("./controllers");
const path = require("path");
const fs = require("fs");

const output_path = path.join(__dirname, "./output");

if (!fs.existsSync(output_path)) fs.mkdirSync(output_path);

ampq.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    console.log(
      `Listening to queue: ${queue}...\nRun 'npm run producer' to send a message to the broker!`
    );
    channel.assertQueue(queue);
    channel.consume(queue, msg => {
      // Parse the query, and pass it to the consumer
      const query = parser(msg.content.toString());
      console.log(query);
      const parsed = JSON.parse(query);
      consumer(parsed, msg.fields.deliveryTag);
    });
  });
});
