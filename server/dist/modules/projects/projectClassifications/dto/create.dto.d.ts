import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';
declare const ProjectClassificationsCreateBodyDto_base: import("@nestjs/common").Type<Omit<ProjectClassifications, "deletedTime" | "createdTime" | "updatedTime">>;
export declare class ProjectClassificationsCreateBodyDto extends ProjectClassificationsCreateBodyDto_base {
}
export {};
