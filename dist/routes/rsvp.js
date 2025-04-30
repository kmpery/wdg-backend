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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rsvp_1 = require("../models/rsvp");
const router = (0, express_1.Router)();
// POST RSVP
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, willAttend } = req.body;
    if (!name || !willAttend) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const newRSVP = new rsvp_1.RSVP({ name, willAttend });
        yield newRSVP.save();
        return res.status(201).json({ message: 'RSVP saved successfully' });
    }
    catch (error) {
        console.error('Error saving RSVP:', error);
        return res.status(500).json({ error: 'Failed to save RSVP' });
    }
}));
// GET all RSVPs
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rsvps = yield rsvp_1.RSVP.find().sort({ createdAt: -1 });
        return res.status(200).json(rsvps);
    }
    catch (error) {
        console.error('Error fetching RSVPs:', error);
        return res.status(500).json({ message: 'Failed to fetch RSVPs' });
    }
}));
exports.default = router;
