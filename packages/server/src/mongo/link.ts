import { MongooseModule } from '@nestjs/mongoose';
/**
 * https://cloud.mongodb.com/v2/631ad9b60d593a53deaf11ed#/clusters/detail/bab
 */
const uri =
  'mongodb+srv://CurryYYX:yin970220@bab.ur07t.mongodb.net/bab?retryWrites=true&w=majority';
export const BaseMongooseModule = MongooseModule.forRoot(
  uri,
  // 'mongodb://localhost:27017/bab',
  // {
  //   user: 'babAdmin',
  //   pass: 'babAdmin',
  // },
);
