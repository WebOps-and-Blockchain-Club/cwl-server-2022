import { Field, InputType } from "type-graphql";
import { Any } from "typeorm";

@InputType("VolunteerInput")
class VolunteerInput {

    @Field(() => String)
    tags!: string;


    @Field(() => Number)
    PhoneNumber!: Number;


    @Field()
    username!: string;


    @Field()
    password!: string;

}
@InputType("LoginInput")
class LoginInput {
    @Field(() => String)
    password!: string

    @Field(() => Number)
    PhoneNumber!: Number
}
@InputType("ComplaintInput")
class ComplaintInput {
    @Field(() => Number)
    PhoneNumber!: Number;

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