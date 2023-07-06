const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Route Imports
const productRoute = require('./routes/products');
const categoryRoute = require('./routes/categories');
const usersRoute = require('./routes/users');

const app = express();

require('dotenv').config(); 

const connectDB = require('./mongoConnect');
connectDB();

const api = process.env.API_URL;
const PORT = process.env.PORT;

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

// Registering the imported routes as a middleware
app.use(`${api}/categories`, categoryRoute);

// Registering the imported routes as a middleware
app.use(`${api}/users`, usersRoute);

// Middleware for Error Handling
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
             message: error.message || 'An unknown error occurred!', 
             success: error.success 
             });
});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`The port is up on port: ${PORT}`);
})
