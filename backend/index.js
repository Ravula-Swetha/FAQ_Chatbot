const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();


const db = require('./config/db');
const QueryModel = require('./models/query');
const feedbackroute = require('./routes/feedbackRoute');


app.use(bodyParser.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
require('dotenv').config();

// connect with mongo
db();

// collab url
const COLLAB_URL = process.env.COLLAB_BACKEND_URL;

// routes
app.get('/', (req, res)=>{
    res.send("welcome to KMIT");
});

// Endpoint for the chatbot
app.post('/rag', async (req, res) => {
    const userQuery = req.body.query;
    const embedding = req.body.embeddings;
    console.log("EMBEDDINGS", embedding);
    try {
        // Forward query to Google Colab
        const colabResponse = await axios.post(`${COLLAB_URL}`, {
            query: userQuery,
        });
       

        // Send Colab response back to the frontend
        console.log("Response: ", colabResponse.data.message);
         // store in mongodb
        const collabAnswer = colabResponse.data.message;
        const newQuery = QueryModel({
            query: userQuery, 
            response: collabAnswer,
            embeddings: embedding
        });
        await newQuery.save();
        console.log("Successfully saved in MongoDB");
    
        
        // queryroute(userQuery, colabResponse.data.message, 'embeddings'); 
        res.status(202).json({ response: colabResponse.data.message});
        
    } catch (error) {
        console.error("Error communicating with Colab or saving to mongoDB:", error.message);
        res.status(500).json({ error: "Failed to connect to RAG pipeline." });
    }
});



// end point for feedback
app.use('/feedback', feedbackroute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
});
