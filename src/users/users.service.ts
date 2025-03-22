// import { Injectable } from "@nestjs/common";
// import { v4 as uuidv4 } from 'uuid'
// import { User } from "./models/user";
// import { CreateUserInput } from "./db/input/create-user.input";
// import { UpdateUserInput } from "./db/input/update-user.input";
// import { GetUserArgs } from "./db/args/get-user.args";
// import { GetUsersArgs } from "./db/args/get-users.args";
// import { DeleteUserInput } from "./db/input/delete-user.input";

// @Injectable()
// export class UsersService {
//     private users: User[] = [];

//     public createUser(createUserData: CreateUserInput): User {
//         const user: User = {
//             userId: uuidv4(),
//             ...createUserData
//         }

//         this.users.push(user)

//         return user
//     }

//     public updateUser(updateUserData: UpdateUserInput): User {
//         const user = this.users.find(user => user.userId === updateUserData.userId)

//         Object.assign(user, updateUserData)

//         return user
//     }

//     public getUser(getUserArgs: GetUserArgs): User {
//         return this.users.find(user => user.userId === getUserArgs.userId)
//     }

//     public getUsers(getUsersArgs: GetUsersArgs): User[] {
//         return getUsersArgs.userIds.map(userId => this.getUser({ userId }))
//     }

//     public deleteUser(deleteUserData: DeleteUserInput): User {
//         const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId)

//         const user = this.users[userIndex]

//         return user
//     }
// }

import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { User } from "./models/user";
import { CreateUserInput } from "./db/input/create-user.input";
import { UpdateUserInput } from "./db/input/update-user.input";
import { GetUserArgs } from "./db/args/get-user.args";
import { GetUsersArgs } from "./db/args/get-users.args";
import { DeleteUserInput } from "./db/input/delete-user.input";

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            email: 'dan@example.com',
            password: 'mypassword',
            userId: '123',
            age: 20,
        }
    ];

    public createUser(createUserData: CreateUserInput): User {
        const user: User = {
            userId: uuidv4(),
            ...createUserData,
        };

        this.users.push(user);
        return user;
    }

    public updateUser(updateUserData: UpdateUserInput): User {
        const user = this.users.find(user => user.userId === updateUserData.userId);

        if (!user) {
            throw new Error(`User with ID ${updateUserData.userId} not found`);
        }

        Object.assign(user, updateUserData);
        return user;
    }

    public getUser(getUserArgs: GetUserArgs): User {
        const user = this.users.find(user => user.userId === getUserArgs.userId);

        if (!user) {
            throw new Error(`User with ID ${getUserArgs.userId} not found`);
        }

        return user;
    }

    public getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds
            .map(userId => this.users.find(user => user.userId === userId))
            .filter((user): user is User => !!user);
    }

    public deleteUser(deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId);

        if (userIndex === -1) {
            throw new Error(`User with ID ${deleteUserData.userId} not found`);
        }

        return this.users.splice(userIndex, 1)[0];
    }
}
