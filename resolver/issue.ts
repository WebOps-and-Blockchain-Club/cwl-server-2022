import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Issue from "../entities/issue";
import { ComplaintInput } from "../types/input";
import { RESOLVED, UNRESOLVED } from "../utils/constants";
@Resolver()
export class IssueResolver {
  @Query(() => [Issue])
  async getIssues() {
    const issues = await Issue.find({ where: { status: UNRESOLVED } });
    return issues;
  }

  @Mutation(() => Issue)
  async postIssue(@Arg("ComplaintInput") complaintInput: ComplaintInput) {
    try {
      const issue = new Issue();
      issue.phoneNumber = complaintInput.phoneNumber;
      issue.username = complaintInput.username;
      issue.tags = complaintInput.tags;
      issue.desc = complaintInput.desc;
      issue.location = complaintInput.location;
      issue.status = UNRESOLVED;
      issue.image = complaintInput.image;
      const CompliantCreated = await issue.save();
      return CompliantCreated;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Mutation(() => Issue)
  async updateIssue(@Arg("ID") id: String) {
    try {
      const issue = await Issue.findOne({ where: { id } });
      issue!.status = RESOLVED;
      await issue?.save();
      return issue;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
}
