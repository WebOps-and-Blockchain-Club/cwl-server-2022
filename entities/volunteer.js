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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const issue_1 = __importDefault(require("./issue"));
let Volunteer = class Volunteer extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Volunteer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Volunteer.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsMobilePhone)(),
    __metadata("design:type", String)
], Volunteer.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Volunteer.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Volunteer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => issue_1.default, (issue) => issue.tags),
    (0, type_graphql_1.Field)(() => [issue_1.default]),
    __metadata("design:type", Array)
], Volunteer.prototype, "issue", void 0);
Volunteer = __decorate([
    (0, typeorm_1.Entity)("Volunteer"),
    (0, type_graphql_1.ObjectType)("Volunteer")
], Volunteer);
exports.default = Volunteer;
