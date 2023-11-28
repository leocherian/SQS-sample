import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "us-east-1" });

export const handler = async (event) => {
  let response;

  const params = {
    DelaySeconds: 10,
    MessageAttributes: {
        "Source": {
          DataType: "String",
          StringValue: "Lambda Sender"
        },
        "Type": {
          DataType: "String",
          StringValue: "Test Message"
        }
      },
    MessageBody: "This is a test message",
    QueueUrl: process.env.SQS_URL
  };


  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    if (data) {
      console.log("Success, message sent. MessageID:", data.MessageId);
      response = {
        statusCode: 200,
        body: JSON.stringify('Success'),
      };
    }else{
      response = {
        statusCode: 500,
        body: JSON.stringify('Error !!')
      };
    }
    return response;
  }
  catch (err) {
    console.log("Error", err);
  }

};