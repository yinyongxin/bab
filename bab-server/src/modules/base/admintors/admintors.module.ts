import { Module } from '@nestjs/common';
import { AdmintorMongooseModule } from '../../../mongo/base';
import { AdmintorsController } from './admintors.controller';
import { AdmintorsService } from './admintors.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../../guards';
@Module({
  imports: [AdmintorMongooseModule],
  controllers: [AdmintorsController],
  providers: [
    AdmintorsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AdmintorsService],
})
export class AdmintorsModule {}
