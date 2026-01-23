import jwt from 'jsonwebtoken';

const SECRET_KEY: string = process.env.JWT_SECRET || 'your-secret-key';

export const signToken = (payload: object) => {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: '1d',
    });
};
