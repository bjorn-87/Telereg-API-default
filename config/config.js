"use strict";

/**
 * Config file for azure-ad-verify and jsonwebtoken(Testing purposes only)
 * Create a .env file in root(See README.md) or hardcode values here
 */
const config = {
    jwtSecret: process.env.JWT_SECRET,
    azureConfig: {
        "jwksUri": process.env.JWK_URI,
        "issuer": process.env.ISS,
        "audience": process.env.AUD
    },
};

module.exports = config;
