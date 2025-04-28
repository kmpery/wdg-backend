import { Router, Request, Response } from 'express';
import { RSVP } from '../models/rsvp';

const router = Router();

// POST RSVP
router.post('/', async (req: Request, res: Response) => {
  const { name, willAttend } = req.body;

  if (!name || !willAttend) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newRSVP = new RSVP({ name, willAttend });
    await newRSVP.save();
    return res.status(201).json({ message: 'RSVP saved successfully' });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return res.status(500).json({ error: 'Failed to save RSVP' });
  }
});

// GET all RSVPs
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 }); // optional: biar data terbaru di atas
    return res.status(200).json(rsvps);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return res.status(500).json({ message: 'Failed to fetch RSVPs' });
  }
});

export default router;
