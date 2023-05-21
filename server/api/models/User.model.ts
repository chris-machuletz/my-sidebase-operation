import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    wishList: Array<String> | undefined;
    key: String | undefined;
    comparePassword: (password: string) => Promise<boolean>;
}

// User schema
const schema: mongoose.Schema = new mongoose.Schema<UserDocument>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        wishList: {
            type: Array<String>,
            required: true,
            default: [],
        },
    },
    { timestamps: true },
);

schema.methods.comparePassword = async function (password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error: any) {
        throw new Error(error);
    }
};

export default mongoose.model<UserDocument>('User', schema);