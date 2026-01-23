import { Router } from 'express';
import UserRepository from '../repositories/user.js';
import userloginRepository from '../repositories/login.js';
import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
const router = Router();
const userRepo = new UserRepository(prisma);
const userloginRepo = new userloginRepository(prisma);
router.post('/register', async (req, res) => {
    try {
        const { username, password, name } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRegister = await userRepo.create({
            username,
            password: hashedPassword,
            name: name || null,
            registeredAt: new Date(),
        });
        return res.status(201).json(userRegister);
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userlogin = await userloginRepo.findByUsername(username);
        if (!userlogin) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const isValid = await bcrypt.compare(password, userlogin.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        return res.status(200).json({
            id: userlogin.id,
            name: userlogin.name,
            message: 'Login successful',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
});
export default router;
