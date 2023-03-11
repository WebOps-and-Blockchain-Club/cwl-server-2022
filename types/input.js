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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterDataInput = exports.LoginInput = exports.ComplaintInput = exports.VolunteerInput = void 0;
const type_graphql_1 = require("type-graphql");
let VolunteerInput = class VolunteerInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], VolunteerInput.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], VolunteerInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], VolunteerInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], VolunteerInput.prototype, "password", void 0);
VolunteerInput = __decorate([
    (0, type_graphql_1.InputType)("VolunteerInput")
], VolunteerInput);
exports.VolunteerInput = VolunteerInput;
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "phoneNumber", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)("LoginInput")
], LoginInput);
exports.LoginInput = LoginInput;
let ComplaintInput = class ComplaintInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ComplaintInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ComplaintInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ComplaintInput.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ComplaintInput.prototype, "desc", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ComplaintInput.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ComplaintInput.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ComplaintInput.prototype, "image", void 0);
ComplaintInput = __decorate([
    (0, type_graphql_1.InputType)("ComplaintInput")
], ComplaintInput);
exports.ComplaintInput = ComplaintInput;
let WaterDataInput = class WaterDataInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], WaterDataInput.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], WaterDataInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], WaterDataInput.prototype, "depth", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], WaterDataInput.prototype, "remarks", void 0);
WaterDataInput = __decorate([
    (0, type_graphql_1.InputType)("WaterDataInput")
], WaterDataInput);
exports.WaterDataInput = WaterDataInput;
