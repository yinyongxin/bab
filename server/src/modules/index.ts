import { Module } from '@nestjs/common';
import { BaseMongooseModule } from '../mongo';
import BaseModuleList from './base';

@Module({
  imports: [BaseMongooseModule, ...BaseModuleList],
  controllers: [],
  providers: [],
})
export class AppModule {}
