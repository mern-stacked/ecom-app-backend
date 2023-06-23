const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const productRoute = require('./routes/products');

const app = express();

require('dotenv').config(); 

const connectDB = require('./mongoConnect');
connectDB();

const api = process.env.API_URL;

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////       Middleware Section             //////////////////

// Enable CORS
app.use(cors());
app.options('*', cors());

// Express Middleware to parse/handle incoming and outgoing requests
app.use(express.json());

// Middleware to log api request made from frontend
app.use(morgan('tiny'));

// Registering the imported routes as a middleware
app.use(`${api}/products`, productRoute);

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`The port is up on port: ${PORT}`);
})
