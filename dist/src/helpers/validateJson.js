"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateJson = (_json) => {
    try {
        const parsedBody = JSON.parse(_json);
        if (parsedBody && typeof parsedBody === 'object') {
            return parsedBody;
        }
    }
    catch (e) {
        return false;
    }
};
exports.default = validateJson;
//# sourceMappingURL=validateJson.js.map