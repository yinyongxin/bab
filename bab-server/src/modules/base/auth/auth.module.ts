import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdmintorsModule } from '../admintors';
import { jwtConstants } from '../../../common/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AdmintorsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
