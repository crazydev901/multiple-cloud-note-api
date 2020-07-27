import * as uuid from "uuid";
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
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      // userId: event.requestContext.identity.cognitoIdentityId,
      userId: "user1",
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  /* AWS-BLOCK-START */
  await dynamoDB.put(params);
  /* AWS-BLOCK-END */
  /* AZURE-BLOCK-START */
  await mongoDB.put(params);
  /* AZURE-BLOCK-END */

  return params.Item;
});
