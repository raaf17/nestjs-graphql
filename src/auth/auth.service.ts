import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    validate(email: string, password: string): User | null {
        const user = this.usersService.getUserByEmail(email)

        if (!user) {
            return null
        }

        const passwordIsValue = password === user.password

        return passwordIsValue ? user : null
    }

    login(user: User): { access_token: string } {
        const payload = {
            email: user.email,
            sub: user.userId
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    verify(token: string): User | null {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: jwtSecret
            });

            const user = this.usersService.getUserByEmail(decoded.email);
            
            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
