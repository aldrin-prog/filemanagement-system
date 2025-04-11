/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const { docClient } = require("./utils/db");
const TABLENAME = "SubmissionsTable-dev";
exports.handler = async (event) => {
// coors


  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul",
                    "Aug","Sep","Oct","Nov","Dec",
                    ];
  try {
    for (const record of event.Records) {
      const command = new ScanCommand({
        TableName: TABLENAME,
        FilterExpression: "#year = :year and #month = :month",
        ExpressionAttributeNames: {
          "#year": "year",
          "#month": "month",
        },
        ExpressionAttributeValues: {
          ":year": year,
          ":month": month,
        },
        Limit: 1,
      });
      const data = await docClient.send(command);
      console.log("data", data);
      if (record.eventName == "INSERT") {
        if (data?.Items.length > 0) {
          // increment the count item
          const updateCommand = new UpdateCommand({
            TableName: TABLENAME,
            Key: {
              id: data.Items[0].id,
              createdAt: data.Items[0].createdAt,
            },
            UpdateExpression:
              "SET #count = #count + :increment , #updatedAt = :updatedAt",
            ExpressionAttributeNames: {
              "#count": "count",
              "#updatedAt": "updatedAt",
            },
            ExpressionAttributeValues: {
              ":increment": 1,
              ":updatedAt": date.toISOString(),
            },
          });
          await docClient.send(updateCommand);
          return;
        } else {
          // insert the data
          const command = new PutCommand({
            TableName: TABLENAME,
            Item: {
              id: uuidv4(),
              year: year,
              month: month,
              monthName: monthName[month - 1],
              count: 1,
              createdAt: date.toISOString(),
              updatedAt: date.toISOString(),
            },
          });
          await docClient.send(command);
        }
      } else if (record.eventName == "REMOVE") {
        // Handle remove event
        // Assuming you want to decrement the count when an item is removed
        const updateCommand = new UpdateCommand({
          TableName: TABLENAME,
          Key: {
            id: data.Items[0].id,
            createdAt: data.Items[0].createdAt,
          },
          UpdateExpression:
            "SET #count = #count - :increment , #updatedAt = :updatedAt",
          ExpressionAttributeNames: {
            "#count": "count",
            "#updatedAt": "updatedAt",
          },
          ExpressionAttributeValues: {
            ":increment": 1,
            ":updatedAt": date.toISOString(),
          },
        });
        await docClient.send(updateCommand);
      }
    }
  } catch (error) {
    console.error("Error processing DynamoDB Stream record:", error);
  }
};
