import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Issue from "../entities/issue";
import Volunteer from "../entities/volunteer";
import { VolunteerInput, LoginInput } from "../types/input";
import bcryptjs from "bcryptjs";
import LoginResponse from "../types/return";
import jwt from "jsonwebtoken";
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
