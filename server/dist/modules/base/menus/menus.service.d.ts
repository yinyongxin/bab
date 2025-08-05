import { Model } from 'mongoose';
import { MenusCreateBodyDto, MenusQueryDto, MenusUpdateDto } from './dto';
import { Menus } from '../../../mongo/base';
import { DeleteIdsDto } from 'src/dtos';
export declare class MenusService {
    private menusModel;
    constructor(menusModel: Model<Menus>);
    addOne(data: MenusCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, Menus> & Menus & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Menus> & Menus & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(idsToUpdate: DeleteIdsDto['ids']): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(id: string, data: MenusUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    getTreeData(): Promise<any>;
    getAllByFilter(filter: MenusQueryDto): Promise<(import("mongoose").Document<unknown, {}, Menus> & Menus & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
