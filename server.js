const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middlewares
app.use(express.json());
app.use(express.static('public'));

const redeemCodesPath = path.join(__dirname, 'redeem-codes.json');
const usedPanelsPath = path.join(__dirname, 'used-panels.json');

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API routes for redeem codes
app.get('/api/redeem-codes', (req, res) => {
    fs.readFile(redeemCodesPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading redeem codes');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/api/redeem-codes', (req, res) => {
    const codes = req.body;
    fs.writeFile(redeemCodesPath, JSON.stringify(codes, null, 2), 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error saving redeem codes');
        } else {
            res.sendStatus(200);
        }
    });
});

// API routes for used panels
app.get('/api/used-panels', (req, res) => {
    fs.readFile(usedPanelsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading used panels');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/api/used-panels', (req, res) => {
    const usedPanels = req.body;
    fs.writeFile(usedPanelsPath, JSON.stringify(usedPanels, null, 2), 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error saving used panels');
        } else {
            res.sendStatus(200);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

