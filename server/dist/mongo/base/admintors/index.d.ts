import { BaseDocument } from '../../global';
import { ObjectId, Types } from 'mongoose';
export declare class Admintors extends BaseDocument {
    username: string;
    password: string;
    avatar: string;
    name: string;
    roles: ObjectId[];
    sex: string;
    phone: string;
    email: string;
    status: string;
}
export declare const AdmintorsSchema: import("mongoose").Schema<Admintors, import("mongoose").Model<Admintors, any, any, any, import("mongoose").Document<unknown, any, Admintors> & Admintors & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Admintors, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Admintors>> & import("mongoose").FlatRecord<Admintors> & {
    _id: Types.ObjectId;
}>;
export declare const AdmintorsMongooseModule: import("@nestjs/common").DynamicModule;
