import * as debug from "./debug-lib";

export default function handler(func) {
  /**
   * @param {Object} EventOrContext - aws: event, azure: context
   * @param {Object} ContextOrRequest - aws: context, azure: request
   */
  return async function () {
    let reqBody, reqHeaders, reqPathParams, reqQueryParams, context, type;
    let body, statusCode;

    if (arguments[0].constructor.name === "InvocationContext") {
      reqBody = arguments[0].req.body;
      reqPathParams = arguments[0].req.params;
      reqQueryParams = arguments[0].req.query;
      context = arguments[0];
      type = "Azure";
    } else if (arguments[0].requestContext && arguments[0].requestContext.identity) {
      reqBody = arguments[0].body;
      reqPathParams = arguments[0].pathParameters;
      reqQueryParams = arguments[0].queryStringParameters;
      reqHeaders = arguments[0].headers;
      context = arguments[0];
      type = "AWS";
    }

    // Start debugger
    debug.init(reqBody, reqPathParams, reqQueryParams);

    try {
      // Run the Lambda
      console.log(typeof body);
      body = await func({
        type,
        headers: reqHeaders,
        body: reqBody,
        pathParameters: reqPathParams,
        queryStringParameters: reqQueryParams,
        context,
      });
      statusCode = 200;
    } catch (e) {
      // Print debug messages
      debug.flush(e);

      body = { error: e.message };
      statusCode = 500;
    }

    // Return HTTP response
    if (type === "Azure") {
      context.res = {
        status: statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      context.done();
    } else {
      return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }
  };
}
