const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/fetch-title', async (req, res) => {
    const url = req.body.url;
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $("title").text();
        res.json({ title: title });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch title' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});