import { Field, ObjectType } from "type-graphql";

@ObjectType("LoginOutput")
class LoginOutput {
    @Field()
    token!: string

    @Field()
    status!: boolean
}

export default LoginOutput