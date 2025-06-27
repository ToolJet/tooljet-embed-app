const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file at the root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get embed app URL
app.get('/api/embed-app-url', async (req, res) => {
    try {
        console.log('Calling ToolJet embed API...');
        
        const response = await axios.post(process.env.TOOLJET_EMBED_APP_URL, {
            email: process.env.USER_EMAIL,
            appId: process.env.TOOLJET_APP_ID
        }, {
            headers: {
                'Authorization': `Basic ${process.env.TOOLJET_AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('ToolJet API response:', response.data);

        // Return only the redirectUrl to the frontend
        res.json({
            success: true,
            redirectUrl: response.data.redirectUrl
        });

    } catch (error) {
        console.error('Error calling ToolJet API:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            error: error.response?.status || 500,
            message: error.response?.data?.message || error.message || 'Failed to get embed URL'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 500,
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the app at: http://localhost:${PORT}`);
});
