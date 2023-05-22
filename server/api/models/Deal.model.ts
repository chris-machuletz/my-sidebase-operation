import mongoose, { Schema, Document } from 'mongoose';

export interface DealDocument extends Document {
	title: string;
	// imageUrls: string[];
	// currentPrice: number;
	// regularPrice: number;
	// expirationDate: Date;
	// url: string;
	// description: string;
	// category: string;
}

const DealSchema: Schema = new Schema({
	title: { type: String, required: true },
	// imageUrls: [{ type: String, required: true }],
	// currentPrice: { type: Number, required: true },
	// regularPrice: { type: Number, required: true },
	// expirationDate: { type: Date, required: true },
	// url: { type: String, required: true },
	// description: { type: String, required: true },
	// category: { type: String, required: true },
});

export default mongoose.model<DealDocument>('Deal', DealSchema);
