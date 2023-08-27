// Import required modules
const express = require('express');

const amazonScraper = require('amazon-buddy');

// Initialize express app
const app = express();

// Use the PORT environment variable provided by Render, or 3001 if running locally
const port = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint for product search
app.post('/product_search', async (req, res) => {
    // Destructure request body
    const { search_keyword, number_of_products } = req.body;
    const results = [];

    try {
        // Loop through each search keyword
        for (const keyword of search_keyword) {
            // Fetch products from Amazon
            const products = await amazonScraper.products({ keyword, number: number_of_products });

            // Validate and collect product information
            const info = products['result'];
            if (Array.isArray(info) && info.length > 0) {
                const firstThreeProducts = info.slice(0, 3);
                results.push(...firstThreeProducts);
            }
        }

        // Send results
        res.json(results);
    } catch (error) {
        // Log error and send error response
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Node.js app listening on port ${port}`);
});
