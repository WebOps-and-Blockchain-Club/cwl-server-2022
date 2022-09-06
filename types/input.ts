import { Field, InputType } from "type-graphql";

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
  password!: string;

  @Field(() => Number)
  PhoneNumber!: Number;
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
}

@InputType("WaterDataInput")
class WaterDataInput {
  @Field(() => String)
  location!: string;

  @Field(() => Number)
  depth!: number;
}

export { VolunteerInput, ComplaintInput, LoginInput, WaterDataInput };
