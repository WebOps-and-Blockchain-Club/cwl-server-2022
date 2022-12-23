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
  
  @Query(() => [WaterData])
  async getWaterData(@Arg("interval", { defaultValue: 1 }) interval: number) {
    const current = Date.now();
    const DaysBefore = new Date(current -interval*MS_IN_DAYS);
    const data = await WaterData.find({
      where: { date: MoreThanOrEqual(DaysBefore) },
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

}
