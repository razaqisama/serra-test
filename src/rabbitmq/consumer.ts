import amqp from 'amqplib';

async function consumeMessages() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('user_notifications');

  channel.consume('user_notifications', async (msg) => {
    if (msg) {
      const user = JSON.parse(msg.content.toString());
      console.log('Received message:', user);

      try {
        await fetch('http://localhost:4000/api/v1/users-notification', {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            message: `Welcome ${user.name}!`,
          })
        });
        
        console.log('Notification sent for user:', user.email);
        channel.ack(msg);
      } catch (error) {
        console.error('Failed to send notification:', error);
        channel.nack(msg);  // Re-queue the message for retry
      }
    }
  });
}

consumeMessages().catch((error) => console.error(error));
