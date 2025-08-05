"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectClassificationsQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const projectClassifications_1 = require("../../../../mongo/projects/projectClassifications");
class ProjectClassificationsQueryDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(projectClassifications_1.ProjectClassifications, ['deletedTime'])) {
}
exports.ProjectClassificationsQueryDto = ProjectClassificationsQueryDto;
//# sourceMappingURL=query.dto.js.map