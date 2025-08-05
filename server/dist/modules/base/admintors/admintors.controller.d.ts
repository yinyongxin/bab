import { AdmintorsService } from './admintors.service';
import { AdmintorsCreateBodyDto, AdmintorsFilterDto, AdmintorsUpdateDto } from './dto';
import { DeleteIdsDto, PaginationDto, QueryIdDto } from '../../../dtos';
export declare class AdmintorsController {
    private readonly admintorsService;
    constructor(admintorsService: AdmintorsService);
    addOne(body: AdmintorsCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Admintors> & import("../../../mongo/base").Admintors & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(body: DeleteIdsDto): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(query: QueryIdDto, body: AdmintorsUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    findById(query: QueryIdDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Admintors> & import("../../../mongo/base").Admintors & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPageList(pagination: PaginationDto, body?: AdmintorsFilterDto): Promise<any>;
}
