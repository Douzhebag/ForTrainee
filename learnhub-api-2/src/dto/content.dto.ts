import { IUserDto } from './user.dto.js';

export interface IContentDto {
    id: number;
    videoTitle: string;
    videoUrl: string;
    comment: string;
    rating: number;
    thumbnailUrl: string;
    creatorName: string;
    creatorUrl: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    User: IUserDto['id'];
}

export interface CreateContentDto {
    id: Number;
    comment: string;
    rating: number;
}
