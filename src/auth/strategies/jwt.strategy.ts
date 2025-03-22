// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { UsersService } from "src/users/users.service";
// import { jwtSecret } from "../constants";
// import { User } from "src/users/models/user";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private readonly usersService: UsersService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: jwtSecret
//         })
//     }

//     validate(validationPayload: { email: string, sub: string }): User | null {
//         return this.usersService.getUserByEmail(validationPayload.email)
//     }
// }

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from "../constants";
import { User } from "src/users/models/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        });
    }

    async validate(validationPayload: { email: string, sub: string }): Promise<User | null> {
        const user = await this.usersService.getUserByEmail(validationPayload.email);

        if (!user) {
            throw new UnauthorizedException("Invalid token: user not found");
        }

        return user;
    }
}
