import { Model } from 'mongoose';
import { ProjectClassificationsCreateBodyDto, ProjectClassificationsQueryDto, ProjectClassificationsUpdateDto } from './dto';
import { ProjectClassifications } from '../../../mongo/projects/projectClassifications';
import { DeleteIdsDto } from 'src/dtos';
export declare class ProjectClassificationsService {
    private projectClassificationsModel;
    constructor(projectClassificationsModel: Model<ProjectClassifications>);
    addOne(data: ProjectClassificationsCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, ProjectClassifications> & ProjectClassifications & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, ProjectClassifications> & ProjectClassifications & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(idsToUpdate: DeleteIdsDto['ids']): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(id: string, data: ProjectClassificationsUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    getTreeData(): Promise<any>;
    getAllByFilter(filter: ProjectClassificationsQueryDto): Promise<(import("mongoose").Document<unknown, {}, ProjectClassifications> & ProjectClassifications & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
