import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';
declare const ProjectClassificationsUpdateDto_base: import("@nestjs/common").Type<Partial<Omit<ProjectClassifications, "deletedTime" | "createdTime">>>;
export declare class ProjectClassificationsUpdateDto extends ProjectClassificationsUpdateDto_base {
}
export {};
