const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const restaurants = [
    { id: 1, name: 'Pizza Place', menu: ['Margherita', 'Pepperoni', 'BBQ Chicken'] },
    { id: 2, name: 'Sushi Spot', menu: ['California Roll', 'Spicy Tuna', 'Sashimi'] },
];

app.get('/api/restaurants', (req, res) => {
    res.json(restaurants);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
