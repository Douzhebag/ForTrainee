export default class ContentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { id, ...rest } = data;
        return this.prisma.content.create({
            data: rest,
        });
    }
}
