import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';
import { Result_idDto } from '../../../../dtos';
declare const ProjectClassificationsResultDto_base: import("@nestjs/common").Type<Result_idDto & Omit<ProjectClassifications, "deletedTime">>;
export declare class ProjectClassificationsResultDto extends ProjectClassificationsResultDto_base {
}
declare const ProjectClassificationsTreeDto_base: import("@nestjs/common").Type<Result_idDto & ProjectClassifications>;
export declare class ProjectClassificationsTreeDto extends ProjectClassificationsTreeDto_base {
    children: ProjectClassificationsTreeDto[];
}
export {};
