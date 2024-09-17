import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/UserModule';
import { AppMongooseModule } from './modules';

@Module({
  imports: [AppMongooseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
