# nmbrs-api-queue-task

### Requirements:

- [Node.js](https://nodejs.org/en/)
- [RabbitMQ](https://www.rabbitmq.com/)

### How to run: 

- Run `npm install` from the project root.
- Create a `.env` file according to the spec provided in `example.env`
- Run `npm start` to start the receiver, and in a separate terminal, run `npm run broker` for sending messages to the queue.