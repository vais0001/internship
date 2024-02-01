const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json

app.post('/validate', (req, res) => {
    const { email, likes, reposts, views } = req.body;
    let errors = [];

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Invalid email address.');
    }

    // Validate numeric values
    if (likes < 1 || likes > 10) {
        errors.push('Likes must be between 1 and 10.');
    }
    if (reposts < 1 || reposts > 10) {
        errors.push('Reposts must be between 1 and 10.');
    }
    if (views < 1 || views > 10) {
        errors.push('Views must be between 1 and 10.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // If all validations pass
    res.json({ message: 'Succeeded' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;