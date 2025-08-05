"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const Public = () => (0, common_1.SetMetadata)(common_2.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=index.js.map