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
  password!: string;

  @Field(() => String)
  phoneNumber!: string;
}
@InputType("ComplaintInput")
class ComplaintInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  phoneNumber!: string;

  @Field(() => String)
  location!: string;

  @Field(() => String)
  desc!: string;

  @Field(() => String)
  tags!: string;

  @Field(() => String)
  status!: string;

  @Field(() => String)
  image!: string;
}

@InputType("WaterDataInput")
class WaterDataInput {
  @Field(() => String)
  location!: string;

  @Field(() => String)
  image!: string;

  @Field(() => Number)
  depth!: number;

  @Field(() => String)
  remarks!: string;
}

export { VolunteerInput, ComplaintInput, LoginInput, WaterDataInput };
