import { Module } from '@nestjs/common';
import { UserModule } from './baseModules/user/UserModule';
import { BaseMongooseModule } from './dbModules';

@Module({
  imports: [BaseMongooseModule, UserModule],
  controllers: [],
  providers: [],
})
export class EnterModule {}
