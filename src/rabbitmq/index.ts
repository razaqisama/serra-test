import { config } from '../config';
import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectToRabbitMQ() {
  const connection = await amqp.connect(config.rabbitmq.url);
  
  console.log("connected to rabbitmq");

  channel = await connection.createChannel();
  await channel.assertQueue('user_notification');
}

export async function sendMessageToQueue(queue: string, message: any) {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}
