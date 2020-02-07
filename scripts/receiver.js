const ampq = require("amqplib/callback_api");

ampq.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    channel.assertQueue("test_queue");
    channel.consume("test_queue", msg => console.log(msg.content.toString()));
  });
});
