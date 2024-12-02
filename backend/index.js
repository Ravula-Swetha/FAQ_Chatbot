const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
require('dotenv').config();

const COLLAB_URL = process.env.COLLAB_BACKEND_URL;

app.get('/', (req, res)=>{
    res.send("welcome to KMIT");
});
// Endpoint for the chatbot
app.post('/rag', async (req, res) => {
    const userQuery = req.body.query;

    try {
        // Forward query to Google Colab
        const colabResponse = await axios.post(`${COLLAB_URL}`, {
            query: userQuery,
        });

        // Send Colab response back to the frontend
        console.log("Response: ", colabResponse.data.message);
        res.json({ response: colabResponse.data.message });
    } catch (error) {
        console.error("Error communicating with Colab:", error.message);
        res.status(500).json({ error: "Failed to connect to RAG pipeline." });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
});
