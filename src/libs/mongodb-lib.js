import { MongoClient } from "mongodb";

const getCollection = (TableName) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(
      process.env.AZURE_COSMOS_DB_URI,
      {
        autoReconnect: true,
        useNewUrlParser: true,
      },
      function (err, client) {
        if (err === null) {
          resolve({ collection: client.db("note").collection(TableName), client });
        } else {
          reject(err);
        }
      }
    );
  });

export default {
  get: (params) =>
    new Promise((resolve, reject) => {
      getCollection(params.TableName)
        .then(({ collection, client }) => {
          collection.findOne(params.Key, function (err, res) {
            if (err === null) {
              client.close();
              resolve({ Item: res });
            } else {
              client.close();
              reject(err);
            }
          });
        })
        .catch((err) => reject(err));
    }),
  put: (params) =>
    new Promise((resolve, reject) => {
      getCollection(params.TableName)
        .then(({ collection, client }) => {
          collection.insertOne(params.Item, function (err, res) {
            if (err === null) {
              if (res.ops.length === 1) {
                client.close();
                resolve(res);
              } else {
                client.close();
                reject(new Error("res.ops.length is not equal with 1"));
              }
            } else {
              client.close();
              reject(err);
            }
          });
        })
        .catch((err) => reject(err));
    }),
  query: (params) =>
    new Promise((resolve, reject) => {
      getCollection(params.TableName)
        .then(({ collection, client }) => {
          collection.find(params.Query || {}).toArray(function (err, res) {
            if (err === null) {
              client.close();
              resolve({ Items: res });
            } else {
              client.close();
              reject(err);
            }
          });
        })
        .catch((err) => reject(err));
    }),
  update: (params) =>
    new Promise((resolve, reject) => {
      getCollection(params.TableName)
        .then(({ collection, client }) => {
          collection.updateOne(params.Key, params.Item, function (err, res) {
            if (err === null) {
              if (res.result.n === 1) {
                client.close();
                resolve(res);
              } else {
                client.close();
                reject(new Error("res.result.n is not equal with 1"));
              }
            } else {
              client.close();
              reject(err);
            }
          });
        })
        .catch((err) => reject(err));
    }),
  delete: (params) =>
    new Promise((resolve, reject) => {
      getCollection(params.TableName)
        .then(({ collection, client }) => {
          collection.deleteOne(params.Key, function (err, res) {
            if (err === null) {
              if (res.result.n === 1) {
                client.close();
                resolve(res);
              } else {
                client.close();
                reject(new Error("res.result.n is not equal with 1"));
              }
            } else {
              client.close();
              reject(err);
            }
          });
        })
        .catch((err) => reject(err));
    }),
};
