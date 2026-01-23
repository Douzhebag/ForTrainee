import { PrismaClient, Content } from '@prisma/client';
import { CreateContentDto } from '../dto/content.dto.js';
import { IContentDto } from '../dto/content.dto.js';
import { IContent } from './index.js';
import { IUserDto } from '../dto/user.dto.js';
export default class ContentRepository {
    constructor(private prisma: PrismaClient) {}

    public async createContent(
        data: IContentDto,
        ownerId: IUserDto['id'],
        name: IUserDto,
    ): Promise<IContent> {
        return this.prisma.content.create({
            data: {
                videoTitle: data.videoTitle,
                videoUrl: data.videoUrl,
                comment: data.comment,
                rating: data.rating,
                thumbnaiUrl: data.thumbnailUrl,
                creatorName: data.creatorName,
                creatorUrl: data.creatorUrl,
                User: {
                    connect: {
                        id: ownerId,
                        name: name.name,
                    },
                },
            },
            include: {
                User: true,
            },
        });
    }
    async findallContent(): Promise<Content[]> {
        return this.prisma.content.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findContentByIdAndOwner(id: number, ownerId: number) {
        return this.prisma.content.findFirst({
            where: {
                id,
                ownerId,
            },
        });
    }
    async UpdateContent(
        id: number,
        data: Partial<CreateContentDto>,
    ): Promise<Content> {
        return this.prisma.content.update({
            where: { id },
            data: {
                comment: data.comment,
                rating: data.rating,
            },
        });
    }
    async deleteContent(id: number): Promise<Content> {
        return this.prisma.content.delete({
            where: { id },
        });
    }
}
