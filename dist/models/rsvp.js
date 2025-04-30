"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSVP = void 0;
const mongoose_1 = require("mongoose");
const rsvpSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    willAttend: { type: String, required: true },
}, { timestamps: true });
exports.RSVP = mongoose_1.models.RSVP || (0, mongoose_1.model)('RSVP', rsvpSchema);
