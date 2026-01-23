import { Content } from '@prisma/client';
import { IUserDto } from '../dto/user.dto.js';

export interface IContent extends Content {
    User: IUserDto;
}
