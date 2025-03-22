import { JwtModuleOptions } from './../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { localStrategy } from './strategies/local.strategy';
import { AuthController } from 'src/auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '3600' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, localStrategy]
})
export class AuthModule { }
