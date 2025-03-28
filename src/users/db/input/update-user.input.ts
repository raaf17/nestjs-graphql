import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    userId: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    age?: number;

    @Field()
    @IsOptional()
    isSubscribed?: boolean
}