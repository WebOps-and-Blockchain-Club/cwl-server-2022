import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Issue from "../entities/issue";
import Volunteer from "../entities/volunteer";
import { VolunteerInput, ComplaintInput, LoginInput } from "../types/input";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import MyContext from "../utils/context";
import LoginOutput from "../types/output";
@Resolver()
export class VolunteerResolver {
    @Mutation(() => LoginOutput)
    async login(@Arg("LoginInput") { phoneNumber, password }: LoginInput) {
        try {
            const volunteer = await Volunteer.findOne({ where: { phoneNumber: phoneNumber } });
            if (!volunteer) throw new Error("Invalid PhoneNumber");
            const passwordIsValid = bcryptjs.compareSync(password, volunteer.password);
            if (!passwordIsValid) throw new Error("Invalid Credentials");
            // jason-web-token for authorisation
            let token = jwt.sign(volunteer.id, process.env.JWT_SECRET!);
            return { token: token, status: true };
        } catch (e) {
            throw new Error(`error : ${e}`);
        }
    }

    @Query(() => Volunteer)
    @Authorized()
    async getMe(@Ctx() { volunteer }: MyContext) {
        return volunteer;
    }

    @Mutation(() => Volunteer)
    async signUp(@Arg("VolunteerInput") VolunteerInput: VolunteerInput) {
        try {
            const volunteer = new Volunteer;
            volunteer.username = VolunteerInput.username;
            volunteer.password = bcryptjs.hashSync(
                VolunteerInput.password,
                Number(process.env.ITR)
            )
            volunteer.tags = VolunteerInput.tags;
            volunteer.phoneNumber = VolunteerInput.phoneNumber;
            const volunteerCreated = await volunteer.save();
            return volunteerCreated;
        }
        catch (e: any) {
            throw new Error(e.message);
        }
    }
}
