import { Module } from '@nestjs/common';
import { DepartmentsMongooseModule } from '../../../mongo/base';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
@Module({
  imports: [DepartmentsMongooseModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
