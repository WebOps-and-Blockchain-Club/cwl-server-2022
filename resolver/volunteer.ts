import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Issue from "../entities/issue";
import Volunteer from "../entities/volunteer";
import { VolunteerInput, LoginInput } from "../types/input";
import bcryptjs from "bcryptjs";
import LoginResponse from "../types/return";

@Resolver()
export class VolunteerResolver {
  @Query(() => LoginResponse)
  async login(@Arg("LoginInput") { phoneNumber, password }: LoginInput) {
    const LoginInfo = await Volunteer.findOne({ phoneNumber });
    const isPasswordValid = bcryptjs.compareSync(
      password,
      LoginInfo?.password || ""
    );
    if (isPasswordValid) {
      return {
        success: true,
        username: LoginInfo?.username,
        tags: LoginInfo?.tags,
      };
    }
    throw Error("Invalid credentials");
  }
  @Mutation(() => Volunteer)
  async signUp(@Arg("VolunteerInput") VolunteerInput: VolunteerInput) {
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
      if (e.code === "23505")
        throw Error("This phone number is already registered");
      throw Error("An error occurred");
    }
  }
}
