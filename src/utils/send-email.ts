import { config } from "../config";
import nodemailer from "nodemailer";

interface IAttachment {
  filename: string;
  path: string;
  cid: string;
}
interface sendEmailPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: IAttachment[];
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  attachments,
}: sendEmailPayload) {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: config.mailer.service,
      auth: {
        user: config.mailer.user,
        pass: config.mailer.password,
      },
    });

    // Email options
    const mailOptions = {
      from: '"Sera Backend Test" razaqisama@gmail.com',
      to,
      subject,
      text,
      html,
      attachments,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.log(err, "ada error saat kirim email");
    return err;
  }
}