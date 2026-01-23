// import { Router, Request, Response } from 'express';
// import prisma from '../lib/prisma.js';

// const router = Router();

// router.post('/content', async (req: Request, res: Response) => {
//     try {

//     } catch (error) {

//     }
// });
import { Router, Request, Response } from 'express';
import ContentRepository from '../repositories/content.repo.js';
import prisma from '../lib/prisma.js';
import { verifyToken } from '../middleware/middleware.jwt.js';
const router = Router();

const contentRepo = new ContentRepository(prisma);

router.get('/', async (_req: Request, res: Response) => {
    try {
        const contents = await contentRepo.findallContent();
        return res.status(200).json(contents);
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
});

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const ownerId = (req as any).user.id;
        const content = await contentRepo.findContentByIdAndOwner(id, ownerId);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        if (content.ownerId !== (req as any).user.id) {
            return res.status(403).json({ message: 'Not Your Content' });
        }
        return res.status(200).json(content);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/contents', verifyToken, async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const ownerId = (req as any).user.id;
        const name = req.body;
        const { rating } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'rating is between 1-5' });
        }
        const content = await contentRepo.createContent(
            {
                ...data,
            },
            ownerId,
            name,
        );
        return res.status(201).json(content);
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
});
router.patch('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const ownerId = (req as any).user.id;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid id parameter' });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is empty' });
        }
        const updatedContent = await contentRepo.UpdateContent(id, ownerId);
        const { rating } = req.body;
        if (updatedContent.ownerId !== (req as any).user.id) {
            return res.status(403).json({ message: 'Not your Content' });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'rating is between 1-5' });
        }
        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        return res.status(200).json(updatedContent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', verifyToken, async (req: any, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const userId = req.user.id;
        const ownerId = req.body;
        const content = await contentRepo.findContentByIdAndOwner(id, ownerId);
        if (!content) {
            return res.status(404).json({
                message: 'Not found content',
            });
        }
        if (content.ownerId !== userId) {
            return res.status(403).json({
                message: 'You are not owner this content',
            });
        }
        await contentRepo.deleteContent(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
});
export default router;
