const express = require('express');

const productRoute = require('./routes/products');

const app = express();
const morgan = require('morgan');
require('dotenv').config(); 
const connectDB = require('./mongoConnect');

connectDB();

const api = process.env.API_URL;

const PORT = 3000 ;
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////       Middleware Section             //////////////////

// Express Middleware to parse/handle incoming and outgoing requests
app.use(express.json());

// Middleware to log api request made from frontend
app.use(morgan('tiny'));

// Registering the imported routes as a middleware
app.use(`${api}/products`, productRoute);

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

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
    console.log(`The port is up on port: ${PORT}`);
})
