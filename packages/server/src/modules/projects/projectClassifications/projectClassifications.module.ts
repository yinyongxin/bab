import { Module } from '@nestjs/common';
import { ProjectClassificationsMongooseModule } from '../../../mongo/projects/projectClassifications';
import { ProjectClassificationsController } from './projectClassifications.controller';
import { ProjectClassificationsService } from './projectClassifications.service';
@Module({
  imports: [ProjectClassificationsMongooseModule],
  controllers: [ProjectClassificationsController],
  providers: [ProjectClassificationsService],
  exports: [ProjectClassificationsService],
})
export class ProjectClassificationsModule {}
