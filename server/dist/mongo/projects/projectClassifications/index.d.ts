import { BaseDocument } from '../../global';
export declare class ProjectClassifications extends BaseDocument {
    name: string;
    description: string;
    sort: number;
    picture: string;
    parent: string;
    status: string;
}
export declare const ProjectClassificationsSchema: import("mongoose").Schema<ProjectClassifications, import("mongoose").Model<ProjectClassifications, any, any, any, import("mongoose").Document<unknown, any, ProjectClassifications> & ProjectClassifications & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProjectClassifications, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProjectClassifications>> & import("mongoose").FlatRecord<ProjectClassifications> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const ProjectClassificationsMongooseModule: import("@nestjs/common").DynamicModule;
