import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Issue from "../entities/issue";
import Volunteer from "../entities/volunteer";
import { VolunteerInput, ComplaintInput, LoginInput } from "../types/input";
@Resolver()
export class VolunteerResolver {
    @Query(() => String)
    async login(@Arg("LoginInput") LoginInput: LoginInput) {
        const LoginInfo = Volunteer.findOne({ PhoneNumber: LoginInput.PhoneNumber })
        console.log(LoginInfo)
        return "HiThere"
    }
    @Mutation(() => Volunteer)
    async signIn(@Arg("VolunteerInput") VolunteerInput: VolunteerInput) {
        try {
            const volunteer = new Volunteer;
            volunteer.username = VolunteerInput.username;
            volunteer.password = VolunteerInput.password;
            volunteer.tags = VolunteerInput.tags;
            volunteer.PhoneNumber = VolunteerInput.PhoneNumber;
            const volunteerCreated = await volunteer.save();
            return volunteerCreated;
        }
        catch (e: any) {
            throw new Error(e.message);
        }
    }
    @Mutation(() => Issue)
    async Complaint(@Arg("ComplaintInput") ComplaintInput: ComplaintInput) {
        try {
            const issue = new Issue;
            issue.PhoneNumber = ComplaintInput.PhoneNumber;
            issue.tags = ComplaintInput.tags;
            issue.desc = ComplaintInput.desc;
            issue.location = ComplaintInput.location;
            const CompliantCreated = await issue.save();
            return CompliantCreated;
        }
        catch (e: any) {
            throw new Error(e.message);
        }
    }
}
