import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Issue from "../entities/issue";
import Volunteer from "../entities/volunteer";
import { VolunteerInput, ComplaintInput, LoginInput } from "../types/input";
import bcryptjs from "bcryptjs";
@Resolver()
export class VolunteerResolver {
  @Query(() => String)
  async testQuery() {
    return "Hello";
  }
  @Query(() => String)
  async login(@Arg("LoginInput") { phoneNumber, password }: LoginInput) {
    const LoginInfo = await Volunteer.findOne({ phoneNumber });
    const passwordIsValid = bcryptjs.compareSync(
      password,
      LoginInfo?.password || ""
    );
    if (passwordIsValid) {
      return "Success";
    }
    return "Failure";
  }
  @Mutation(() => Volunteer)
  async signIn(@Arg("VolunteerInput") VolunteerInput: VolunteerInput) {
    try {
      const volunteer = new Volunteer();
      volunteer.username = VolunteerInput.username;
      volunteer.password = bcryptjs.hashSync(
        VolunteerInput.password,
        Number(process.env.ITR)
      );
      volunteer.tags = VolunteerInput.tags;
      volunteer.phoneNumber = VolunteerInput.phoneNumber;
      const volunteerCreated = await volunteer.save();
      return volunteerCreated;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
