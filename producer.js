const ampq = require("amqplib/callback_api");
const { queue } = require("./config");

module.exports = msg => {
  ampq.connect("amqp://localhost", (err, connection) => {
    if (err) throw err;
    connection.createChannel((err, channel) => {
      if (err) throw err;
      channel.assertQueue(queue);
      const isSent = channel.sendToQueue(queue, Buffer.from(msg));
      console.log(
        `The message ${isSent ? "has" : "has not"} been sent to the queue.`
      );
      // Temporary workaround for safely closing the producer so the input gets passed to the receiver
      setTimeout(() => process.exit(), 500);
    });
  });
};
