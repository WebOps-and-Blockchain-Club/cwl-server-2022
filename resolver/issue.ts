import { Query, Resolver } from "type-graphql";

@Resolver()
export class IssueResolver {
    @Query(() => String)
    async issues() {
        return "Hello";
    }
}