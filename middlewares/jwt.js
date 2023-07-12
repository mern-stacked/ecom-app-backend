const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET_KEY;

    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path : [
            { url: /\/api\/v1\/products(.*)/ , methods: [ 'GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/ , methods: [ 'GET', 'OPTIONS'] },
            '/api/v1/users/register',
            '/api/v1/users/login',
        ]
    })
}

async function isRevoked(req, payload) {
    
    // if our user makes a authorized api call and is not admin then reject the token
    if(payload.payload.isAdmin == false){
        // not a admin : reject the token
        return true;
    } 
    // admin
    return false;
}

module.exports = authJwt;