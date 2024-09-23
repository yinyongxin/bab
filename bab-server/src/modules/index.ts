import { Module } from '@nestjs/common';
import { UsersModule } from './base/users/users.module';
import { BaseMongooseModule } from '../mongo';
import { AuthModule } from './base/auth/auth.module';

@Module({
  imports: [BaseMongooseModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class EnterModule {}
