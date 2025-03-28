import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class DeleteUserInput {
    @Field()
    @IsNotEmpty()
    userId: string;
}