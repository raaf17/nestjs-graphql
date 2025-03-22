import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./models/user";
import { UsersService } from "./users.service";
import { GetUserArgs } from "./db/args/get-user.args";
import { GetUsersArgs } from "./db/args/get-users.args";
import { CreateUserInput } from "./db/input/create-user.input";
import { UpdateUserInput } from "./db/input/update-user.input";
import { DeleteUserInput } from "./db/input/delete-user.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decoration";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => User, { name: 'user', nullable: true })
    @UseGuards(GqlAuthGuard)
    getUser(@CurrentUser() user: User, @Args() getUserArgs: GetUserArgs): User {
        return this.usersService.getUser(getUserArgs)
    }

    @Query(() => [User], { name: 'users', nullable: 'items' })
    getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
        return this.usersService.getUsers(getUsersArgs)
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserData: CreateUserInput): User {
        return this.usersService.createUser(createUserData)
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
        return this.usersService.updateUser(updateUserData)
    }

    @Mutation(() => User)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
        return this.usersService.deleteUser(deleteUserData)
    }
}