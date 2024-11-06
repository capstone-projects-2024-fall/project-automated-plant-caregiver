import express from 'express';
import serverless from 'serverless-express';
import OpenAI from 'openai';
import cors from 'cors';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize DynamoDB
const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Initialize OpenAI with latest model
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Helper to store chat history in DynamoDB
async function storeChatHistory(userId, message, response) {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            userId,
            timestamp: new Date().toISOString(),
            message,
            response,
        }
    };

    await ddbDocClient.send(new PutCommand(params));
}

app.post('/chat', async (req, res) => {
    try {
        const { message, imageUrl, imageBase64, userId } = req.body;

        if (!message && !imageUrl && !imageBase64) {
            return res.status(400).json({ error: 'Either message or image is required' });
        }

        // Prepare messages for ChatGPT
        const messages = [
            { role: "system", content: "You are the Oracle of Planti, a knowledgeable assistant specializing in plant care and gardening advice." },
            { role: "user", content: message }
        ];

        // If image is provided, add it to the messages
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

        // Call OpenAI with GPT-4 Vision if image is present, otherwise use GPT-4
        const response = await openai.chat.completions.create({
            model: imageUrl || imageBase64 ? "gpt-4-vision-preview" : "gpt-4-turbo-preview",
            messages,
            max_tokens: 500
        });

        const aiResponse = response.choices[0].message.content;

        // Store chat history if userId is provided
        if (userId) {
            await storeChatHistory(userId, message, aiResponse);
        }

        return res.status(200).json({ message: aiResponse });
    } catch (error) {
        console.error('Error processing chat request:', error);
        return res.status(500).json({ error: 'Failed to process chat request', details: error.message });
    }
});

export const handler = serverless(app);