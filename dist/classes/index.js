"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(status, message, error, payload) {
        this.timestamp = new Date(Date.now());
        this.status = status;
        this.message = message;
        this.error = error ? error : '';
        this.payload = payload ? payload : '';
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=index.js.map