export interface IUserDto {
    id: number;
    username: string;
    name: string | null;
    password: string;
    registeredAt: Date;
}

export interface ILoginDto {
    id?: number;
    username: string;
    password: string;
}

export type CreatecontentUserDto = Omit<IUserDto, 'id'>;

// export type CreateUserDto = Omit<IUserDto, 'id?'>;
