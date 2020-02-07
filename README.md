# nmbrs-api-queue-task

### Requirements:

- [Node.js](https://nodejs.org/en/)
- [RabbitMQ](https://www.rabbitmq.com/)

### How to run: 

- Run `npm install` from the project root.
- Create a `.env` file according to the spec provided in `example.env`
- Run `npm start` to start the receiver, and in a separate terminal, run `npm run broker` for sending messages to the queue.

### The `.env` file

This file should be created in the project root

```env
USERNAME= <API account email>
API_KEY= <API token>
QUEUE= <Queue name>
```

### Todos: 

- [ ] Fix the date difference calculation function
- [x] Clear out messages that have been completed from the queue
- [x] Set the output directory
- [x] Change file naming convention of the produced JSON files