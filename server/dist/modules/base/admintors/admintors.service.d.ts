import { Model } from 'mongoose';
import { AdmintorsCreateBodyDto, AdmintorsFilterDto, AdmintorsUpdateDto } from './dto';
import { Admintors } from '../../../mongo/base';
import { PaginationDto } from '../../../dtos';
export declare class AdmintorsService {
    private userModel;
    constructor(userModel: Model<Admintors>);
    addOne(data: AdmintorsCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, Admintors> & Admintors & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Admintors> & Admintors & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneByFilter(filter: {
        username?: string;
        email?: string;
    }): import("mongoose").Query<import("mongoose").Document<unknown, {}, Admintors> & Admintors & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Admintors> & Admintors & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Admintors, "findOne", {}>;
    deleteByIds(idsToUpdate: string[]): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(id: string, data: AdmintorsUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    getPageList(pagination: PaginationDto, filter: AdmintorsFilterDto): Promise<any>;
}
