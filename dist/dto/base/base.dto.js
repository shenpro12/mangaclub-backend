"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDto = void 0;
const class_transformer_1 = require("class-transformer");
class BaseDto {
    static plainToInstance(obj) {
        return (0, class_transformer_1.plainToInstance)(this, obj);
    }
}
exports.BaseDto = BaseDto;
//# sourceMappingURL=base.dto.js.map