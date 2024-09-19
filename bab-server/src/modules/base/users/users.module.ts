import { Module } from '@nestjs/common';
import { UserMongooseModule } from '../../../db/schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  imports: [UserMongooseModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
