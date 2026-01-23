// import { PrismaClient, UserLH } from '../../generated/prisma/client';
// import { IUserDto } from '../dto/user';

// export default class UserRepository {
//     constructor(private prisma: PrismaClient) {}

//     create(data: IUserDto): Promise<UserLH> {
//         return this.prisma.userLH.create({ data });
//     }

//     findByUsername(username: string): Promise<UserLH | null> {
//         return this.prisma.userLH.findUnique({
//             where: { username },
//         });
//     }
// }

// import { PrismaClient, UserLH } from '../../generated/prisma/client';
// import { CreateUserDto } from '../dto/user';

// export default class UserRepository {
//     constructor(private prisma: PrismaClient) {}

//     create(data: CreateUserDto): Promise<UserLH> {
//         return this.prisma.userLH.create({ data });
//     }

//     findByUsername(username: string): Promise<UserLH | null> {
//         return this.prisma.userLH.findUnique({
//             where: { username },
//         });
//     }
// }

// import { PrismaClient, UserLH, Prisma } from '../../generated/prisma/client';
// import { IUserDto } from '../dto/user';

// export default class UserRepository {
//     constructor(private prisma: PrismaClient) {}

//     // ใช้ IUserDto ได้ แต่จะตัด id ทิ้งก่อนส่งเข้า Prisma
//     async create(data: IUserDto): Promise<UserLH> {
//         const { id, ...rest } = data; // ดึง id ออก (ไม่ให้ไปอยู่ใน data)

//         return this.prisma.userLH.create({
//             data: rest as Prisma.UserLHCreateInput, // บอก TS ว่า rest ตรงกับ CreateInput
//         });
//     }

//     async findByUsername(username: string): Promise<UserLH | null> {
//         return this.prisma.userLH.findFirst({
//             where: { username },
//         });
//     }
// }
import { PrismaClient, UserLH, Prisma } from '../../generated/prisma/client.js';
import { IUserDto } from '../dto/user.dto.js';

export default class UserRepository {
    constructor(private prisma: PrismaClient) {}
    create(data: Prisma.UserLHCreateInput): Promise<IUserDto> {
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
    async findByUsername(username: string): Promise<UserLH | null> {
        return this.prisma.userLH.findUnique({
            where: { username },
        });
    }
    async findByUserId(id: number): Promise<UserLH | null> {
        return this.prisma.userLH.findUnique({
            where: { id },
        });
    }
}
