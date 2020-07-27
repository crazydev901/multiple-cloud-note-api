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
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      // userId: event.requestContext.identity.cognitoIdentityId,
      userId: "user1",
      noteId: event.pathParameters.id,
    },
  };

  let result;
  /* AWS-BLOCK-START */
  result = await dynamoDB.get(params);
  /* AWS-BLOCK-END */
  /* AZURE-BLOCK-START */
  result = await mongoDB.get(params);
  /* AZURE-BLOCK-END */

  if (!result || !result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});
