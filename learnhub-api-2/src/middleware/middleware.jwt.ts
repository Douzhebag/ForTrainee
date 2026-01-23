import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY: string = process.env.JWT_SECRET || 'dev-secret-key';

export interface AuthRequest extends Request {
    user?: JwtPayload & { id: number; username: string; name: string };
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token' });
    }

    const token = authHeader.split(' ')[1];
    const parts = token.split('.');

    if (parts.length !== 3) {
        return res.status(401).json({
            message: 'Invalid token format',
            detail: `Token must have 3 parts, got ${parts.length}`,
        });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.user = decoded as AuthRequest['user'];
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res
                .status(401)
                .json({ message: 'Invalid token', error: err.message });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};
