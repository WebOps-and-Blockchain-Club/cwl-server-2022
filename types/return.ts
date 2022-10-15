import { Field, ObjectType } from "type-graphql";

@ObjectType()
class LoginResponse {
  @Field(() => String)
  token: string | undefined;
  @Field(() => Boolean)
  success: boolean | undefined;
}

export default LoginResponse;
