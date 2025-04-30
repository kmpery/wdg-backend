import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import commentsRouter from './routes/comments';
import rsvpRouter from './routes/rsvp';
import morgan from 'morgan';

// Load environment var
dotenv.config();

const app: Application = express();
const PORT = parseInt(process.env.PORT || '8080', 10);
const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  console.error('MONGO_URI belum diset di .env');
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://wdg-frontend-production.up.railway.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Koneksi MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Terhubung ke MongoDB'))
  .catch((error) => console.error('Gagal konek ke MongoDB:', error));

// Routing
app.use('/api/comments', commentsRouter);
app.use('/api/rsvp', rsvpRouter);

// Endpoint test
app.get('/', (req: Request, res: Response) => {
  res.send('API Buku Tamu & RSVP aktif!');
});

// Error handling middleware (optional)
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan pada server!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
});
