import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import commentsRouter from './routes/comments';
import rsvpRouter from './routes/rsvp';
// Optional: For logging requests during development
import morgan from 'morgan';

// Load environment variables from .env file
dotenv.config(); // <- load isi file .env

const app: Application = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  console.error('MONGO_URI belum diset di .env');
  process.exit(1); // keluar kalau tidak ada koneksi database
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // optional: logging HTTP requests for development

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

// Jalankan server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
