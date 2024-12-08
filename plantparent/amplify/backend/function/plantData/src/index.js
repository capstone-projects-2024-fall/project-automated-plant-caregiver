/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_PLANTDATAV3_ARN
    STORAGE_PLANTDATAV3_NAME
    STORAGE_PLANTDATAV3_STREAMARN
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('Received event:', event);

    const method = event.httpMethod; // Determine HTTP method (GET or POST)
    const tableName = process.env.STORAGE_PLANTDATAV3_NAME; // Use the table name from environment variables

    try {
        if (method === 'POST') {
            // Parse incoming data from ESP32
            const body = JSON.parse(event.body);

            // Validate the incoming data
            if (!body.temp || !body.soil_moisture || !body.lux) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Missing required fields: temp, soil_moisture, lux' }),
                };
            }

            // Construct item to store in DynamoDB
            const item = {
                y: new Date().toISOString(), // Unique timestamp string for the record
                timestamp: new Date().toISOString(), // Duplicate timestamp for easier querying
                temp: body.temp, // Temperature value from ESP32
                soil_moisture: body.soil_moisture, // Soil moisture value
                lux: body.lux, // Lux value
            };

            // Save the item to DynamoDB
            await dynamoDb.put({
                TableName: tableName,
                Item: item,
            }).promise();

            // Respond with success
            return {
                statusCode: 200,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    message: 'Data stored successfully!',
                }),
            };
        }

        if (method === 'GET') {
            const queryParams = event.queryStringParameters || {};
            if (queryParams.mostRecent === 'true') {
                // Fetch the most recent record using a scan operation
                const result = await dynamoDb.scan({
                    TableName: tableName,
                }).promise();

                if (!result.Items || result.Items.length === 0) {
                    return {
                        statusCode: 404,
                        headers: { 'Access-Control-Allow-Origin': '*' },
                        body: JSON.stringify({ message: 'No data found' }),
                    };
                }

                // Sort items by timestamp in descending order and take the most recent one
                const sortedItems = result.Items.sort(
                    (a, b) => new Date(b.y).getTime() - new Date(a.y).getTime()
                );

                return {
                    statusCode: 200,
                    headers: { 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify(sortedItems[0]), // Return the most recent item
                };
            }

            // Default: Fetch all records from DynamoDB
            const result = await dynamoDb.scan({ TableName: tableName }).promise();
            console.log('Fetched data:', result.Items);

            return {
                statusCode: 200,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(result.Items), // Return all records
            };
        }

        // Handle unsupported HTTP methods
        return {
            statusCode: 405,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    } catch (error) {
        console.error('Error processing request:', error);

        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                message: 'Internal Server Error',
                error: error.message,
            }),
        };
    }
};
