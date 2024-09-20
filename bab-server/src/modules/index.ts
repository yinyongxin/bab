import { Module } from '@nestjs/common';
import { UsersModule } from './base/users/users.module';
import { BaseMongooseModule } from '../db';

@Module({
  imports: [BaseMongooseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class EnterModule {}
