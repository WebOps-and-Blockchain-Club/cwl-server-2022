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
exports.IssueResolver = void 0;
const type_graphql_1 = require("type-graphql");
const issue_1 = __importDefault(require("../entities/issue"));
const input_1 = require("../types/input");
const constants_1 = require("../utils/constants");
let IssueResolver = class IssueResolver {
    getIssues() {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield issue_1.default.find({ where: { status: constants_1.UNRESOLVED } });
            return issues;
        });
    }
    postIssue(complaintInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const issue = new issue_1.default();
                issue.phoneNumber = complaintInput.phoneNumber;
                issue.username = complaintInput.username;
                issue.tags = complaintInput.tags;
                issue.desc = complaintInput.desc;
                issue.location = complaintInput.location;
                issue.status = constants_1.UNRESOLVED;
                issue.image = complaintInput.image;
                const CompliantCreated = yield issue.save();
                return CompliantCreated;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    updateIssue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const issue = yield issue_1.default.findOne({ where: { id } });
                issue.status = constants_1.RESOLVED;
                yield (issue === null || issue === void 0 ? void 0 : issue.save());
                return issue;
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [issue_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "getIssues", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => issue_1.default),
    __param(0, (0, type_graphql_1.Arg)("ComplaintInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.ComplaintInput]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "postIssue", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => issue_1.default),
    __param(0, (0, type_graphql_1.Arg)("ID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "updateIssue", null);
IssueResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], IssueResolver);
exports.IssueResolver = IssueResolver;
