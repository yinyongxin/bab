import { Module } from '@nestjs/common';
import { BaseMongooseModule } from '../mongo';
import { RolesModule, AuthModule, AdmintorsModule } from './base';

@Module({
  imports: [BaseMongooseModule, AuthModule, AdmintorsModule, RolesModule],
  controllers: [],
  providers: [],
})
export class EnterModule {}
