import { Module } from '@nestjs/common';
import { RolesMongooseModule } from '../../../mongo/base';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../../guards';
@Module({
  imports: [RolesMongooseModule],
  controllers: [RolesController],
  providers: [
    RolesService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [RolesService],
})
export class RolesModule {}
