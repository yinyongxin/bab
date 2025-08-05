import { DepartmentsService } from './departments.service';
import { DepartmentsCreateBodyDto, DepartmentsUpdateDto, DepartmentsQueryDto } from './dto';
import { DeleteIdsDto, QueryIdDto } from '../../../dtos';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    addOne(body: DepartmentsCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Departments> & import("../../../mongo/base").Departments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(body: DeleteIdsDto): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(query: QueryIdDto, body: DepartmentsUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    findById(query: QueryIdDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Departments> & import("../../../mongo/base").Departments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getTreeData(): Promise<any>;
    getAllByFilter(body: DepartmentsQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../mongo/base").Departments> & import("../../../mongo/base").Departments & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
