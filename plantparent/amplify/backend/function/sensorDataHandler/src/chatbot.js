import express from 'express';
import serverless from 'serverless-express';
import OpenAI from 'openai';
import cors from 'cors';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const app = express();
app.use(cors({
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Initialize DynamoDB
const ddbClient = new DynamoDBClient({ region: 'us-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Initialize OpenAI with latest model
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function storeChatHistory(userId, message, response) {
    const params = {
        TableName: 'ChatMessages',
        Item: {
            userId,
            timestamp: new Date().toISOString(),
            message,
            response,
        }
    };

    try {
        await ddbDocClient.send(new PutCommand(params));
    } catch (error) {
        console.error('Failed to store chat history:', error);
        // Continue execution even if storage fails
    }
}

app.post('/Chat', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { message, imageUrl, imageBase64, userId } = req.body;
        console.log('Received request:', {
            hasMessage: !!message,
            hasImage: !!(imageUrl || imageBase64),
            hasUserId: !!userId
        });

        if (!message && !imageUrl && !imageBase64) {
            return res.status(400).json({ error: 'Either message or image is required' });
        }

        const messages = [
            { role: "system", content: "You are the Oracle of Planti, a knowledgeable assistant specializing in plant care and gardening advice." },
            { role: "user", content: message }
        ];

        if (imageUrl || imageBase64) {
            messages[1].content = [
                {
                    type: "text",
                    text: message
                },
                {
                    type: "image_url",
                    image_url: imageUrl || `data:image/jpeg;base64,${imageBase64}`
                }
            ];
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // Updated model name
            messages,
            max_tokens: 500
        });

        const aiResponse = response.choices[0].message.content;

        if (userId) {
            await storeChatHistory(userId, message, aiResponse);
        }

        return res.status(200).json({ message: aiResponse });
    } catch (error) {
        console.error('Error processing chat request:', error);
        return res.status(500).json({
            error: 'Failed to process chat request',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

export const handler = serverless(app);