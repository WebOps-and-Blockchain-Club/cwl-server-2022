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
exports.VolunteerResolver = void 0;
const type_graphql_1 = require("type-graphql");
const volunteer_1 = __importDefault(require("../entities/volunteer"));
const input_1 = require("../types/input");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const return_1 = __importDefault(require("../types/return"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let VolunteerResolver = class VolunteerResolver {
    login({ phoneNumber, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordValid = phoneNumber === "1234567890" && password === "1234567890";
            if (isPasswordValid) {
                const response = {
                    token: jsonwebtoken_1.default.sign(phoneNumber, process.env.JWT_SECRET),
                    success: true,
                };
                return response;
            }
            return {
                token: undefined,
                success: false,
            };
        });
    }
    getVolunteers() {
        return __awaiter(this, void 0, void 0, function* () {
            const volunteers = yield volunteer_1.default.find({});
            return volunteers;
        });
    }
    signUp(VolunteerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const volunteer = new volunteer_1.default();
                volunteer.username = VolunteerInput.username;
                volunteer.password = bcryptjs_1.default.hashSync(VolunteerInput.password, Number(process.env.ITR));
                volunteer.tags = VolunteerInput.tags;
                volunteer.phoneNumber = VolunteerInput.phoneNumber;
                const volunteerCreated = yield volunteer.save();
                return volunteerCreated;
            }
            catch (e) {
                if (e.code === "23505")
                    throw Error("This phone number is already registered");
                throw Error("An error occurred");
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => return_1.default),
    __param(0, (0, type_graphql_1.Arg)("LoginInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], VolunteerResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Query)(() => [volunteer_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VolunteerResolver.prototype, "getVolunteers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => volunteer_1.default),
    __param(0, (0, type_graphql_1.Arg)("VolunteerInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.VolunteerInput]),
    __metadata("design:returntype", Promise)
], VolunteerResolver.prototype, "signUp", null);
VolunteerResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], VolunteerResolver);
exports.VolunteerResolver = VolunteerResolver;
