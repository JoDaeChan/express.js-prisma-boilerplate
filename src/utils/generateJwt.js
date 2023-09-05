const jwt = require("jsonwebtoken");

function generateJwt(payload, secretKey, expiresIn) {
    return jwt.sign(payload, secretKey, {
        expiresIn: expiresIn,
        issuer: "DaechanJo",
    });
}

module.exports = generateJwt;
