const ampq = require("amqplib/callback_api");
const { queue } = require("../config");
const parser = require("../utils/parseQuery");

ampq.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    console.log(
      "Listening to the queue...\nRun `npm run producer` to send a message to the broker!"
    );
    channel.assertQueue(queue);
    channel.consume(queue, msg => {
      const query = parser(msg.content.toString());
      const parsed = JSON.parse(query);
      console.log(parsed);
    });
  });
});
