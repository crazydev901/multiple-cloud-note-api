import handler from "@/libs/handler-lib";
import dynamoDb from "@/libs/dynamodb-lib";

export const main = handler(async (context, ...props) => {
  // const params = {
  //   TableName: process.env.tableName,
  //   // 'KeyConditionExpression' defines the condition for the query
  //   // - 'userId = :userId': only return items with matching 'userId'
  //   //   partition key
  //   // 'ExpressionAttributeValues' defines the value in the condition
  //   // - ':userId': defines 'userId' to be Identity Pool identity id
  //   //   of the authenticated user
  //   KeyConditionExpression: "userId = :userId",
  //   ExpressionAttributeValues: {
  //     ":userId": event.requestContext.identity.cognitoIdentityId
  //   }
  // };

  // const result = await dynamoDb.query(params);

  // // Return the matching list of items in response body
  // return result.Items;
  // if(props[0].log) {
  //   props[0].log(props);
  // }
  console.log(props);
  return;
  context.log.info({hello: 'world'});  
  context.log("Context=", JSON.stringify(context, null, 2));
  context.log("Props=", JSON.stringify(props, null, 2));
  context.res = {
    status: 200,
    body: "Hello func2"
  }
});
