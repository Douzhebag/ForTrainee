import { Router, Request, Response } from 'express';
import UserRepository from '../repositories/user.repo.js';
import userloginRepository from '../repositories/login.repo.js';
import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import { signToken } from '../util/util.token.js';
import { verifyToken } from '../middleware/middleware.jwt.js';
import ContentRepository from '../repositories/content.repo.js';

const router = Router();
const userRepo = new UserRepository(prisma);
const userloginRepo = new userloginRepository(prisma);
const contentRepo = new ContentRepository(prisma);
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, name } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRegister = await userRepo.create({
            username,
            name: name,
            password: hashedPassword,
            registeredAt: new Date(),
        });
        // const token = signToken({
        //     id: userRegister.id,
        //     username: userRegister.username,
        // });
        return res.status(201).json({
            id: userRegister.id,
            name: userRegister.name,
            message: 'User registered successfully',
            // token,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: (err as Error).message });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const userlogin = await userloginRepo.findByUsername(username);
        const userId = userlogin?.id || 0;
        if (!userlogin) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const isValid = await bcrypt.compare(password, userlogin.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = signToken({
            id: userlogin.id,
            name: userlogin.name,
        });
        return res.status(200).json({
            id: userId,
            name: userlogin.name,
            message: 'Login successful',
            accessToken: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: (error as Error).message });
    }
});
router.get('/auth/me', verifyToken, async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const userlogin = await userloginRepo.findByname(userData);
        // const { ...safeUser } = userlogin;

        return res.status(200).json({
            data: userlogin// data: safeUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server',
        });
    }
});
export default router;
