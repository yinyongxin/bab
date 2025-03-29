import { Module } from '@nestjs/common';
import { AdmintorsMongooseModule } from '../../../mongo/base';
import { AdmintorsController } from './admintors.controller';
import { AdmintorsService } from './admintors.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../../guards';
@Module({
  imports: [AdmintorsMongooseModule],
  controllers: [AdmintorsController],
  providers: [
    AdmintorsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [AdmintorsService],
})
export class AdmintorsModule {}
