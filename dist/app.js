"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const comments_1 = __importDefault(require("./routes/comments"));
const rsvp_1 = __importDefault(require("./routes/rsvp"));
const morgan_1 = __importDefault(require("morgan"));
// Load environment var
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '8080', 10);
const MONGO_URI = process.env.MONGO_URI || '';
if (!MONGO_URI) {
    console.error('MONGO_URI belum diset di .env');
    process.exit(1);
}
// Middleware
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://wdg-frontend-production.up.railway.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Koneksi MongoDB
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log('Terhubung ke MongoDB'))
    .catch((error) => console.error('Gagal konek ke MongoDB:', error));
// Routing
app.use('/api/comments', comments_1.default);
app.use('/api/rsvp', rsvp_1.default);
// Endpoint test
app.get('/', (req, res) => {
    res.send('API Buku Tamu & RSVP aktif!');
});
// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Terjadi kesalahan pada server!');
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
});
