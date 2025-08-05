import { Model } from 'mongoose';
import { DepartmentsCreateBodyDto, DepartmentsQueryDto, DepartmentsUpdateDto } from './dto';
import { Departments } from '../../../mongo/base';
import { DeleteIdsDto } from 'src/dtos';
export declare class DepartmentsService {
    private departmentsModel;
    constructor(departmentsModel: Model<Departments>);
    addOne(data: DepartmentsCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, Departments> & Departments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Departments> & Departments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(ids: DeleteIdsDto['ids']): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(id: string, data: DepartmentsUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    getTreeData(): Promise<any>;
    getAllByFilter(filter: DepartmentsQueryDto): Promise<(import("mongoose").Document<unknown, {}, Departments> & Departments & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
