const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.SECRET;

const authorization = function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(500).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }

        req.loggedUser = decoded;
        next();

    });
};
module.exports = authorization;
