import { BaseDocument } from '../../global';
export declare class Menus extends BaseDocument {
    name: string;
    description: string;
    path: string;
    sort: number;
    icon: string;
    parent: string;
    menuType: string;
    isHide: boolean;
}
export declare const MenusSchema: import("mongoose").Schema<Menus, import("mongoose").Model<Menus, any, any, any, import("mongoose").Document<unknown, any, Menus> & Menus & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Menus, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Menus>> & import("mongoose").FlatRecord<Menus> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const MenusMongooseModule: import("@nestjs/common").DynamicModule;
