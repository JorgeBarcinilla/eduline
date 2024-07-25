import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'xcvbnm',
      signOptions: { expiresIn: '30s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
