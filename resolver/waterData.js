"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterDataResolver = void 0;
const type_graphql_1 = require("type-graphql");
const waterData_1 = __importDefault(require("../entities/waterData"));
const typeorm_1 = require("typeorm");
const input_1 = require("../types/input");
const constants_1 = require("../utils/constants");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = __importDefault(require("crypto"));
const util_1 = require("util");
let WaterDataResolver = class WaterDataResolver {
    getS3URL() {
        return __awaiter(this, void 0, void 0, function* () {
            const randomBytes = (0, util_1.promisify)(crypto_1.default.randomBytes);
            const rawBytes = yield randomBytes(16);
            const imageName = `${rawBytes.toString("hex")}.jpeg`;
            const { REGION: region, BUCKET_NAME: bucketName, AWS_ACCESS_KEY_ID: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey, } = process.env;
            const s3 = new aws_sdk_1.default.S3({
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
            const uploadURL = yield s3.getSignedUrlPromise("putObject", params);
            return uploadURL;
        });
    }
    getWaterData(interval, depth) {
        return __awaiter(this, void 0, void 0, function* () {
            const current = Date.now();
            if (current - interval * constants_1.MS_IN_DAYS >= 0) {
                const DaysBefore = new Date(current - interval * constants_1.MS_IN_DAYS);
                const data = yield waterData_1.default.find({
                    where: {
                        date: (0, typeorm_1.MoreThanOrEqual)(DaysBefore),
                        depth: (0, typeorm_1.MoreThanOrEqual)(depth),
                    },
                });
                return data;
            }
            else {
                return yield waterData_1.default.find({});
            }
        });
    }
    postWaterData({ location, depth, image, remarks }) {
        return __awaiter(this, void 0, void 0, function* () {
            const waterData = new waterData_1.default();
            waterData.location = location;
            waterData.image = image;
            waterData.date = new Date();
            waterData.depth = depth;
            waterData.remarks = remarks;
            const waterDataCreated = yield waterData.save();
            return waterDataCreated;
        });
    }
    deleteWaterData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteData = yield waterData_1.default.findOne({ where: { id } });
                yield (deleteData === null || deleteData === void 0 ? void 0 : deleteData.remove());
                return deleteData;
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
    flagWaterData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flagData = yield waterData_1.default.findOne({ where: { id } });
                flagData.flagged = true;
                yield (flagData === null || flagData === void 0 ? void 0 : flagData.save());
                return flagData;
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WaterDataResolver.prototype, "getS3URL", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [waterData_1.default]),
    __param(0, (0, type_graphql_1.Arg)("interval", { defaultValue: 1 })),
    __param(1, (0, type_graphql_1.Arg)("depth", { defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], WaterDataResolver.prototype, "getWaterData", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => waterData_1.default),
    __param(0, (0, type_graphql_1.Arg)("WaterDataInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.WaterDataInput]),
    __metadata("design:returntype", Promise)
], WaterDataResolver.prototype, "postWaterData", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => waterData_1.default),
    __param(0, (0, type_graphql_1.Arg)("ID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WaterDataResolver.prototype, "deleteWaterData", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => waterData_1.default),
    __param(0, (0, type_graphql_1.Arg)("ID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WaterDataResolver.prototype, "flagWaterData", null);
WaterDataResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], WaterDataResolver);
exports.WaterDataResolver = WaterDataResolver;
