export default class userloginRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUsername(username) {
        return this.prisma.userLH.findFirst({
            where: { username },
        });
    }
}
