import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field()
    userId: string;

    @Field()
    email: string;

    @Field()
    age: number;

    @Field({ nullable: true})
    isSubscribed?: boolean;
}