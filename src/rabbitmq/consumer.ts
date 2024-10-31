import { config } from '@/config';
import amqp from 'amqplib';

async function consumeMessages() {
  console.log("rabbitmq consumer started");

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('user_notification');

  channel.consume('user_notification', async (msg) => {
    if (msg) {
      const user = JSON.parse(msg.content.toString());
      console.log('Received message:', user);

      try {
        await fetch(`${config.app.baseUrl}/api/v1/notifications`, {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            message: `Welcome ${user.name}!`,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });

        console.log('Notification sent for user:', user.email);
        channel.ack(msg);
      } catch (error) {
        console.error('Failed to send notification:', error);
        channel.nack(msg);
      }
    }
  });
}

consumeMessages().catch((error) => console.error(error));
