import { Module } from '@nestjs/common';
import { MenusMongooseModule } from '../../../mongo/base';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../../guards';
@Module({
  imports: [MenusMongooseModule],
  controllers: [MenusController],
  providers: [
    MenusService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [MenusService],
})
export class MenusModule {}
