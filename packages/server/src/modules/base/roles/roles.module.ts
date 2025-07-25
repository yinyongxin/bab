import { Module } from '@nestjs/common';
import { RolesMongooseModule } from '../../../mongo/base';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
@Module({
  imports: [RolesMongooseModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
