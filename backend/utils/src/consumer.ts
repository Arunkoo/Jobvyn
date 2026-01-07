import { Kafka } from "kafkajs";
import nodemailer from "nodemailer";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
import dotenv from "dotenv";

dotenv.config();
export const startSendMailConsumer = async () => {
  try {
    //creating a new instance of kafka...
    const kafka = new Kafka({
      clientId: "mail-service",
      brokers: [process.env.Kafka_Broker || "localhost:9092"],
    });

    // "creating a consumer for mail service"
    const consumer = kafka.consumer({ groupId: "mail-service-group" });
    await consumer.connect();

    // assigning topic name
    const topicName = "send-mail";
    // subscribing to mailservice...
    await consumer.subscribe({ topic: topicName, fromBeginning: false });

    console.log("📨 Mail service consumer started, listening sending mail.");

    // if all set than run consumer..
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const { to, subject, html } = JSON.parse(
            message.value?.toString() || "{}"
          );

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "xyz",
              pass: "yzx",
            },
          });

          await transporter.sendMail({
            from: "jobvyn <no-reply>",
            to,
            subject,
            html,
          });
          console.log(`Mail has been send to ${to}`);
        } catch (error) {
          console.log("Failed to send mail", error);
        }
      },
    });
  } catch (error) {
    console.log("Failed to start Kafka", error);
  }
};
