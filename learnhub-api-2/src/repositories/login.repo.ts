import { PrismaClient, UserLH } from '@prisma/client';

export default class userloginRepo {
    constructor(private prisma: PrismaClient) {}

    async findByUsername(username: string): Promise<UserLH | null> {
        return this.prisma.userLH.findFirst({
            where: { username },
        });
    }
    async findByname(name: string): Promise<UserLH| null>{
        return this.prisma.userLH.findFirst({
            where: { name }
        })
    }
}
