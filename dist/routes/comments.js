"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = __importDefault(require("../models/comment"));
const router = express_1.default.Router();
// POST kirim komentar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, message } = req.body;
        const newComment = new comment_1.default({ name, message });
        yield newComment.save();
        res.status(201).json({ message: 'Komentar berhasil dikirim' });
    }
    catch (error) {
        res.status(500).json({ error: 'Gagal mengirim komentar' });
    }
}));
// GET semua komentar
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_1.default.find().sort({ createdAt: -1 });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ error: 'Gagal mengambil komentar' });
    }
}));
exports.default = router;
