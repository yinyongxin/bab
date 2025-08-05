import { BaseDocument } from '../../global';
export declare class Roles extends BaseDocument {
    name: string;
    description: string;
    icon: string;
    menus: string[];
}
export declare const RolesSchema: import("mongoose").Schema<Roles, import("mongoose").Model<Roles, any, any, any, import("mongoose").Document<unknown, any, Roles> & Roles & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Roles, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Roles>> & import("mongoose").FlatRecord<Roles> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const RolesMongooseModule: import("@nestjs/common").DynamicModule;
