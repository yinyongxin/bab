import { Module } from '@nestjs/common';
import { AdmintorsModule } from './base/admintors/admintors.module';
import { BaseMongooseModule } from '../mongo';
import { AuthModule } from './base/auth/auth.module';

@Module({
  imports: [BaseMongooseModule, AuthModule, AdmintorsModule],
  controllers: [],
  providers: [],
})
export class EnterModule {}
