const ampq = require("amqplib/callback_api");
const { queue } = require("./config");

module.exports = msg => {
  ampq.connect("amqp://localhost", (err, connection) => {
    if (err) throw err;
    connection.createChannel((err, channel) => {
      if (err) throw err;
      channel.assertQueue(queue);
      const isSent = channel.sendToQueue(queue, Buffer.from(msg), {
        expiration: 0
      });
      console.log(
        `The message ${isSent ? "has" : "has not"} been sent to the queue.`
      );
      /**
       * This timeout is sort of necessary for safely
       * exiting the producer. If this timeout is not present,
       * the input provided will not be passed to the consumer.
       */
      setTimeout(() => process.exit(), 100);
    });
  });
};
