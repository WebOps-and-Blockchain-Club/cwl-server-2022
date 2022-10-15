import { VolunteerResolver } from "./volunteer";
import { WaterDataResolver } from "./waterData";
import { IssueResolver } from "./issue";

export default [VolunteerResolver, WaterDataResolver, IssueResolver] as const;
