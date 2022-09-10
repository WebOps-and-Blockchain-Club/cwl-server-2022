import { Field, ObjectType } from "type-graphql";

@ObjectType()
class LoginResponse {
  @Field(() => Boolean)
  success: boolean | undefined;

  @Field(() => String)
  username: string | null | undefined;

  @Field(() => String)
  tags: string | null | undefined;
}

export default LoginResponse;
