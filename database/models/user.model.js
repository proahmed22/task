import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENT', 'AGENT'],
        default: 'CLIENT',
        required: true,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'DELETED'],
        default: 'ACTIVE',
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hashSync(this.password, +process.env.SALT_HASH);
    next();
})

export const userModel = model("user", userSchema);
