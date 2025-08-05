"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMongooseModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uri = 'mongodb+srv://CurryYYX:yin970220@bab.ur07t.mongodb.net/bab?retryWrites=true&w=majority';
exports.BaseMongooseModule = mongoose_1.MongooseModule.forRoot(uri);
//# sourceMappingURL=link.js.map