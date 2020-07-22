import util from "util";
// import AWS from "aws-sdk";

let logs;

// Log AWS SDK calls
// AWS.config.logger = { log: debug };

export default function debug() {
  logs.push({
    date: new Date(),
    string: util.format.apply(null, arguments),
  });
}

export function init(body, pathParams, queryParams) {
  logs = [];

  // Log API event
  debug("API event", {
    body: body,
    pathParameters: pathParams,
    queryStringParameters: queryParams,
  });
}

export function flush(e) {
  logs.forEach(({ date, string }) => console.debug(date, string));
  console.error(e);
}
