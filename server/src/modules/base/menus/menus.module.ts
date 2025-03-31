import { Module } from '@nestjs/common';
import { MenusMongooseModule } from '../../../mongo/base';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
@Module({
  imports: [MenusMongooseModule],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
