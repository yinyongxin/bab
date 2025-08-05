import { Model, ObjectId } from 'mongoose';
export declare const deleteByIds: <M extends Model<any>>(model: M, ids: ObjectId[], isFake?: boolean) => Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
