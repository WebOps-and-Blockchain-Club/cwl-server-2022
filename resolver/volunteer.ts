import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Volunteer from "../entities/volunteer";
import { VolunteerInput, LoginInput } from "../types/input";
import jwt from "jsonwebtoken";
import LoginResponse from "../types/return";
@Resolver()
export class VolunteerResolver {
  @Query(() => LoginResponse)
  async login(@Arg("LoginInput") { phoneNumber, password }: LoginInput) {
    const isPasswordValid =
      phoneNumber === "1234567890" && password === "1234567890";
    if (isPasswordValid) {
      const response = {
        token: jwt.sign(phoneNumber, process.env.JWT_SECRET!),
        success: true,
      };
      console.log(response);
      return response;
    }
    return {
      token: undefined,
      success: false,
    };
  }
  @Query(() => [Volunteer])
  async getVolunteers() {
    const volunteers = await Volunteer.find({});
    return volunteers;
  }
  @Mutation(() => Volunteer)
  async signUp(@Arg("VolunteerInput") VolunteerInput: VolunteerInput) {
    try {
      const volunteer = new Volunteer();
      volunteer.username = VolunteerInput.username;
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
