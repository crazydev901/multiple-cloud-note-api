import handler from "@/libs/handler-lib";
/* AWS-BLOCK-START */
import dynamoDB from "@/libs/dynamodb-lib";
/* AWS-BLOCK-END */
/* AZURE-BLOCK-START */
import mongoDB from "@/libs/mongodb-lib";
/* AZURE-BLOCK-END */

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      // userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  /* AWS-BLOCK-START */
  await dynamoDB.update(params);
  /* AWS-BLOCK-END */
  /* AZURE-BLOCK-START */
  await mongoDB.update({
    TableName: params.TableName,
    Key: params.Key,
    Item: { $set: { attachment: data.attachment || null, content: data.content || null } },
  });
  /* AZURE-BLOCK-END */

  return { status: true };
});
