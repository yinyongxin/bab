import { MenusService } from './menus.service';
import { MenusCreateBodyDto, MenusUpdateDto, MenusQueryDto } from './dto';
import { DeleteIdsDto, QueryIdDto } from '../../../dtos';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    addOne(body: MenusCreateBodyDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Menus> & import("../../../mongo/base").Menus & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteByIds(body: DeleteIdsDto): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateOne(query: QueryIdDto, body: MenusUpdateDto): Promise<import("mongoose").UpdateWriteOpResult>;
    findById(query: QueryIdDto): Promise<import("mongoose").Document<unknown, {}, import("../../../mongo/base").Menus> & import("../../../mongo/base").Menus & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getTreeData(): Promise<any>;
    getAllByFilter(body: MenusQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../mongo/base").Menus> & import("../../../mongo/base").Menus & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
