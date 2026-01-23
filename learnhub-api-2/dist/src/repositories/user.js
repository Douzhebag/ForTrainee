// import { PrismaClient, UserLH } from '../../generated/prisma/client';
// import { IUserDto } from '../dto/user';
export default class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
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
    async findByUsername(username) {
        return this.prisma.userLH.findFirst({
            where: { username },
        });
    }
}
