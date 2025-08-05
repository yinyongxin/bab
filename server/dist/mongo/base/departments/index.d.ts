import { BaseDocument } from '../../global';
export declare class Departments extends BaseDocument {
    name: string;
    description: string;
    sort: number;
    icon: string;
    parent: string;
    status: string;
}
export declare const DepartmentsSchema: import("mongoose").Schema<Departments, import("mongoose").Model<Departments, any, any, any, import("mongoose").Document<unknown, any, Departments> & Departments & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Departments, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Departments>> & import("mongoose").FlatRecord<Departments> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const DepartmentsMongooseModule: import("@nestjs/common").DynamicModule;
