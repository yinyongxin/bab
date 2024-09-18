import { Module } from '@nestjs/common';
import { UserMongooseModule } from '../../../schemas/user/index.';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [UserMongooseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
