"use strict";
// import { PrismaClient, UserLH } from '../../generated/prisma/client';
// import { IUserDto } from '../dto/user';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    creat(data) {
        return this.prisma.userLH.create({
            data,
            select: {
                id: true,
                username: true,
                name: true,
                registeredAt: true,
            },
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.userLH.findFirst({
                where: { username },
            });
        });
    }
}
exports.default = UserRepository;
