import { Field, InputType } from "type-graphql";
import { Any } from "typeorm";

@InputType("VolunteerInput")
class VolunteerInput {

    @Field(() => String)
    tags!: string;


    @Field(() => String)
    phoneNumber!: string;


    @Field()
    username!: string;


    @Field()
    password!: string;

}

@InputType("LoginInput")
class LoginInput {
    @Field(() => String)
    password!: string

    @Field(() => String)
    phoneNumber!: string
}

@InputType("ComplaintInput")
class ComplaintInput {
    @Field(() => String)
    phoneNumber!: string;

    @Field(() => String)
    location!: string;

    @Field(() => String)
    desc!: string;

    @Field(() => String)
    tags!: string;

    @Field(() => String)
    status!: string

}

export { VolunteerInput, ComplaintInput, LoginInput } 