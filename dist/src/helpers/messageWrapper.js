"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageWrapper = (type, data) => {
    return JSON.stringify({
        type,
        data: JSON.stringify(data),
        id: 0,
    });
};
exports.default = messageWrapper;
//# sourceMappingURL=messageWrapper.js.map