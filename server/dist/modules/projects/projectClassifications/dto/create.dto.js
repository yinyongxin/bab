"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectClassificationsCreateBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const projectClassifications_1 = require("../../../../mongo/projects/projectClassifications");
class ProjectClassificationsCreateBodyDto extends (0, swagger_1.OmitType)(projectClassifications_1.ProjectClassifications, ['deletedTime', 'createdTime', 'updatedTime']) {
}
exports.ProjectClassificationsCreateBodyDto = ProjectClassificationsCreateBodyDto;
//# sourceMappingURL=create.dto.js.map