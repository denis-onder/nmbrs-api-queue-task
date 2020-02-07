const ampq = require("amqplib/callback_api");
const { queue } = require("../config");

ampq.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    console.log(
      "Listening to the queue...\nRun `npm run producer` to send a message to the broker!"
    );
    channel.assertQueue(queue);
    channel.consume(queue, msg => console.log(msg.content.toString()));
  });
});
