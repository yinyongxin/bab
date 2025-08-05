import { ProjectClassificationsService } from './projectClassifications.service';
import { ProjectClassificationsCreateBodyDto, ProjectClassificationsUpdateDto, ProjectClassificationsQueryDto } from './dto';
import { DeleteIdsDto, QueryIdDto } from '../../../dtos';
export declare class ProjectClassificationsController {
    private readonly projectClassificationsService;
    constructor(projectClassificationsService: ProjectClassificationsService);
    addOne(body: ProjectClassificationsCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/projects/projectClassifications").ProjectClassifications> & import("../../../mongo/projects/projectClassifications").ProjectClassifications & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(body: DeleteIdsDto): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(query: QueryIdDto, body: ProjectClassificationsUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    findById(query: QueryIdDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/projects/projectClassifications").ProjectClassifications> & import("../../../mongo/projects/projectClassifications").ProjectClassifications & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getTreeData(): Promise<any>;
    getAllByFilter(body: ProjectClassificationsQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../mongo/projects/projectClassifications").ProjectClassifications> & import("../../../mongo/projects/projectClassifications").ProjectClassifications & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
