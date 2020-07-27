import handler from "@/libs/handler-lib";
/* AWS-BLOCK-START */
import dynamoDB from "@/libs/dynamodb-lib";
/* AWS-BLOCK-END */
/* AZURE-BLOCK-START */
import mongoDB from "@/libs/mongodb-lib";
/* AZURE-BLOCK-END */

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      // ":userId": event.requestContext.identity.cognitoIdentityId,
      ":userId": "user1",
    },
  };

  let result;
  /* AWS-BLOCK-START */
  result = await dynamoDB.query(params);
  /* AWS-BLOCK-END */
  /* AZURE-BLOCK-START */
  result = await mongoDB.query({ TableName: params.TableName, Key: { userId: "user1" } });
  /* AZURE-BLOCK-END */

  // Return the matching list of items in response body
  return result.Items;
});
