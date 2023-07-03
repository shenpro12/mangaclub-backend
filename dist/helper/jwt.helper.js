"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jwt = require('jsonwebtoken');
const generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        const userData = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        jwt.sign({ data: userData }, secretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        }, (error, token) => {
            if (error) {
                return reject(error);
            }
            resolve(token);
        });
    });
};
exports.generateToken = generateToken;
const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.helper.js.map