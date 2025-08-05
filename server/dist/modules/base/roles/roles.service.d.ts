import { Model } from 'mongoose';
import { RoleCreateBodyDto, RolesQueryFilterDto, RolesUpdateDto } from './dto';
import { Roles } from '../../../mongo/base';
import { PaginationDto } from '../../../dtos';
export declare class RolesService {
    private rolesModel;
    constructor(rolesModel: Model<Roles>);
    addOne(data: RoleCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, Roles> & Roles & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Roles> & Roles & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(ids: string[]): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(id: string, data: RolesUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    getPageList(pagination: PaginationDto, filter: RolesQueryFilterDto): Promise<{
        total: any;
        list: any;
        pageNo: number;
        pageSize: number;
    }>;
    getAll(filter: RolesQueryFilterDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Roles> & Roles & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Roles> & Roles & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Roles, "find", {}>;
}
