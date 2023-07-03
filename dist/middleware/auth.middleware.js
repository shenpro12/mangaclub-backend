"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jwt_helper_1 = require("../helper/jwt.helper");
async function Auth(req, res, next) {
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    try {
        let user = await (0, jwt_helper_1.verifyToken)(accessToken, process.env.TOKEN_SECRET);
        req['userId'] = user.data.id;
        req['token'] = accessToken;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'token expired' });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.middleware.js.map