import { BaseDocument } from '../../global';
export declare class Files extends BaseDocument {
    originalname: string;
    uniquedName: string;
    mimetype: string;
    size: number;
    path: string;
}
export declare const FilesSchema: import("mongoose").Schema<Files, import("mongoose").Model<Files, any, any, any, import("mongoose").Document<unknown, any, Files> & Files & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Files, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Files>> & import("mongoose").FlatRecord<Files> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const FilesMongooseModule: import("@nestjs/common").DynamicModule;
