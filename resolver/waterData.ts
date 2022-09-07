import { Arg, Mutation, Query, Resolver } from "type-graphql";
import WaterData from "../entities/waterData";
import { MoreThanOrEqual } from "typeorm";
import { WaterDataInput } from "../types/input";
import { MS_IN_2_DAYS } from "../utils/constants";

@Resolver()
export class WaterDataResolver {
  @Query(() => [WaterData])
  async getWaterData() {
    try {
      const current = Date.now();
      const twoDaysBefore = new Date(current - MS_IN_2_DAYS);
      const data = await WaterData.find({
        where: { date: MoreThanOrEqual(twoDaysBefore) },
      });
      return data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  @Mutation(() => WaterData)
  async postWaterData(
    @Arg("WaterDataInput") { location, depth, image }: WaterDataInput
  ) {
    try {
      const waterData = new WaterData();
      waterData.location = location;
      waterData.image = image;
      waterData.date = new Date();
      waterData.depth = depth;

      const waterDataCreated = await waterData.save();
      return waterDataCreated;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
