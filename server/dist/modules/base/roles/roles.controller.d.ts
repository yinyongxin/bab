import { RolesService } from './roles.service';
import { RoleCreateBodyDto, RolesQueryFilterDto, RolesUpdateDto } from './dto';
import { DeleteIdsDto, PaginationDto, QueryIdDto } from '../../../dtos';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    addOne(body: RoleCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Roles> & import("../../../mongo/base").Roles & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(body: DeleteIdsDto): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(query: QueryIdDto, body: RolesUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    findById(query: QueryIdDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Roles> & import("../../../mongo/base").Roles & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPageList(pagination: PaginationDto, body?: RolesQueryFilterDto): Promise<{
        total: any;
        list: any;
        pageNo: number;
        pageSize: number;
    }>;
    getAll(body: RolesQueryFilterDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../mongo/base").Roles> & import("../../../mongo/base").Roles & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
