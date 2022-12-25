import { Arg, Mutation, Query, Resolver } from "type-graphql";
import WaterData from "../entities/waterData";
import { MoreThanOrEqual } from "typeorm";
import { WaterDataInput } from "../types/input";
import { MS_IN_DAYS } from "../utils/constants";
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";

@Resolver()
export class WaterDataResolver {
  @Query(() => String)
  async getS3URL() {
    const randomBytes = promisify(crypto.randomBytes);
    const rawBytes = await randomBytes(16);
    const imageName = `${rawBytes.toString("hex")}.jpeg`;
    const {
      REGION: region,
      BUCKET_NAME: bucketName,
      AWS_ACCESS_KEY_ID: accessKeyId,
      AWS_SECRET_ACCESS_KEY: secretAccessKey,
    } = process.env;
    const s3 = new aws.S3({
      region,
      accessKeyId,
      secretAccessKey,
      signatureVersion: "v4",
    });

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60,
    };

    const uploadURL: string = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
  }

  @Mutation(() => [WaterData])
  async getWaterData(@Arg("interval", { defaultValue: 1 }) interval: number) {
    const current = Date.now();
    const DaysBefore = new Date(current - interval * MS_IN_DAYS);
    const data = await WaterData.find({
      where: { date: MoreThanOrEqual(DaysBefore) },
    });
    return data;
  }

  @Mutation(() => [WaterData])
  async getDataDepth(@Arg("depth", { defaultValue: 1 }) depth: number) {
    const data = await WaterData.find({
      where: { depth: MoreThanOrEqual(depth) },
    });
    return data;
  }

  @Mutation(() => WaterData)
  async postWaterData(
    @Arg("WaterDataInput") { location, depth, image, remarks }: WaterDataInput
  ) {
    const waterData = new WaterData();
    waterData.location = location;
    waterData.image = image;
    waterData.date = new Date();
    waterData.depth = depth;
    waterData.remarks = remarks;
    const waterDataCreated = await waterData.save();
    return waterDataCreated;
  }

  @Mutation(() => WaterData)
  async deleteWaterData(@Arg("ID") id: String) {
    try {
      const deleteData = await WaterData.findOne({ where: { id } });
      await deleteData?.remove();
      return deleteData;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  @Mutation(() => WaterData)
  async flagWaterData(@Arg("ID") id: String) {
    try {
      const flagData = await WaterData.findOne({ where: { id } });
      flagData!.flagged = true;
      await flagData?.save();
      return flagData;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
}
