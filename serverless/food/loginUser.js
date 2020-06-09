'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.login = (event, context, callback) => {
    const params = {
        TableName: process.env.FOOD_APP_USERS_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    dynamoDb.get(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(new Error('Could not fetch the user'));
            return;
        }

        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
        },
            body: JSON.stringify(result.Item),
        };
        callback(null, response);
    });
};