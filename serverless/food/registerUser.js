'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.register = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.name !== 'string' || typeof data.email !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Could not register the user.'));
    return;
  }

  const params = {
    TableName: process.env.FOOD_APP_USERS_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: timestamp,
    },
  };

  // write the pet to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Could not register the user.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: "User is registered Successfully",
    };
    callback(null, response);
  });
};