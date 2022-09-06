import { Arg, Mutation, Query, Resolver } from "type-graphql";
import WaterData from "../entities/waterData";
import { WaterDataInput } from "../types/input";

const MS_IN_2_DAYS = 2 * 24 * 60 * 60 * 1000;

@Resolver()
export class WaterDataResolver {
  @Query(() => [WaterData])
  async getWaterData() {
    try {
      const current = Date.now();
      const twoDaysBefore = current - MS_IN_2_DAYS;
      //   const data = await WaterData.find({
      //     where: { date: { gt: twoDaysBefore } },
      //   });
      const data = await WaterData.find();
      return data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  @Mutation(() => WaterData)
  async postWaterData(
    @Arg("WaterDataInput") { location, depth }: WaterDataInput
  ) {
    try {
      const waterData = new WaterData();
      waterData.location = location;
      waterData.date = new Date();
      waterData.depth = depth;

      const waterDataCreated = await waterData.save();
      return waterDataCreated;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
