// Producer
const ampq = require("amqplib/callback_api");
const query = `{'source_app' => 'nmbrs',
    'user' => $username,
    'pass' => $apikey,	
    'group' => 1234,
    'controller' => 'importDaysoff',
}`;

ampq.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    channel.assertQueue("test_queue");
    channel.sendToQueue("test_queue", Buffer.from(query));
    console.log("msg sent");
  });
});
