import { Module } from '@nestjs/common';
import { UserMongooseModule } from 'src/schemas/user/index.';
import { UserController } from './UserController';
import { UserService } from './UserService';
@Module({
  imports: [UserMongooseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
