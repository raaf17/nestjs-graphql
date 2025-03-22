import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/users/models/user";

@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({usernameField: 'email'})
    }

    validate(email: string, password: string): User{
        const user = this.authService.validate(email, password)

        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}