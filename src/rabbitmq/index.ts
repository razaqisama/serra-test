import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectToRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  await channel.assertQueue('user_notifications');
}

export async function sendMessageToQueue(queue: string, message: any) {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}
