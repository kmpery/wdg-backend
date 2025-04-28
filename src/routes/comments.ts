import express, { Request, Response } from 'express';
import Comment, { IComment } from '../models/comment';

const router = express.Router();

// POST kirim komentar
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, message } = req.body;
    const newComment = new Comment({ name, message });
    await newComment.save();
    res.status(201).json({ message: 'Komentar berhasil dikirim' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengirim komentar' });
  }
});

// GET semua komentar
router.get('/', async (req: Request, res: Response) => {
  try {
    const comments: IComment[] = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil komentar' });
  }
});

export default router;
