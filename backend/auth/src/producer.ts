import { Kafka, Producer, Admin } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

let producer: Producer;
let admin: Admin;

export const connectKafka = async () => {
  try {
    const kafka = new Kafka({
      clientId: "auth-service",
      brokers: [process.env.Kafka_Brokers || "localhost:9092"],
    });

    admin = kafka.admin();
    await admin.connect();

    const topics = await admin.listTopics();

    if (!topics.includes("send-mail")) {
      await admin.createTopics({
        topics: [
          {
            topic: "send-mail",
            numPartitions: 1, //amount of work load in parallisim..
            replicationFactor: 1, //that it means how many copies of data i want to save on diff brokers..
          },
        ],
      });

      console.log("✅ Topic: 'send-mail' created succesfully.");
    }
    admin.disconnect();

    //activate producer....
    producer = kafka.producer();
    await producer.connect();

    console.log("✅ Connected to kafka producer");
  } catch (error) {
    console.log("❌ Failed to connect kafka");
  }
};

export const publishToTopic = async (topic: string, message: any) => {
  if (!producer) {
    console.log("❌ kafka producer is not initialized");
    return;
  }

  try {
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  } catch (error) {
    console.log("❌ Failed to publish message to kafka", error);
  }
};

export const disconnectKafka = async () => {
  if (producer) {
    producer.disconnect();
  }
};
