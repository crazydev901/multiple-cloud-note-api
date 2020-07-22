import handler from "@/libs/handler-lib";

export const main = handler(async (event, context) => {
  context.res = {
    status: 200,
    body: JSON.stringify(event),
  }
});
