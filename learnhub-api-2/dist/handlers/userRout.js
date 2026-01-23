import { Router } from 'express';
import UserRepository from '../repositories/user';
import prisma from '../lib/prisma';
const router = Router();
const userRepo = new UserRepository(prisma);
router.post('/register', async (req, res) => {
    try {
        const user = await userRepo.creat(req.body);
        return res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});
export default router;
