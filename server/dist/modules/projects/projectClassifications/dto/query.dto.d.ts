import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';
declare const ProjectClassificationsQueryDto_base: import("@nestjs/common").Type<Partial<Omit<ProjectClassifications, "deletedTime">>>;
export declare class ProjectClassificationsQueryDto extends ProjectClassificationsQueryDto_base {
}
export {};
