import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/UserModule';
@Module({
  imports: [
    MongooseModule.forRoot(
      // 'http://124.221.183.172:27017/bab',
      'mongodb://localhost:27017/bab',
      {
        user: 'babAdmin',
        pass: 'babAdmin',
      },
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
