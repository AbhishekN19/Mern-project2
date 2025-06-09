const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    console.log('Check Auth Token MIDDLEWARE CALLED');

    if(!authToken && !refreshToken) {
        return res.status(401).json({ message: ' Authentication failed:No authToken or refreshToken provided'});
    }
    
}

module.exports = checkAuth;