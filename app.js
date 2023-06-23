const express = require('express');
const app = express();

require('dotenv').config();
const api = process.env.API_URL;

const PORT = 3000 ;

// Express Middleware to parse/handle incoming and outgoing requests
app.use(express.json())

app.get(`${api}/products`, (req, res) => {
    const product = {
        id : 1,
        name: 'Eshwa',
        image: 'some dummy image'
    }
    res.send(product)
})

app.post(`${api}/products`, (req, res) => {
    const product = req.body;
    console.log(product);
    res.send(product)
})

app.listen(PORT, () => {
    console.log(api)
    console.log(`The port is up on port: ${PORT}`);
})
