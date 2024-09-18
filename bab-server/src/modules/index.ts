import { Module } from '@nestjs/common';
import { UserModule } from './baseModules/userModule/user.module';
import { BaseMongooseModule } from './db.module';

@Module({
  imports: [BaseMongooseModule, UserModule],
  controllers: [],
  providers: [],
})
export class EnterModule {}
