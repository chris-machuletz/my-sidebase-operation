import mongoose, { Schema, Document } from 'mongoose';

export interface DealDocument extends Document {
	title: string;
	// imageUrls: string[];
	price: String;
	basisPrice: String;
	expirationDate: Date;
	url: string;
	// description: string;
	// category: string;
}

const DealSchema: Schema = new Schema({
	title: { type: String, required: true },
	// imageUrls: [{ type: String, required: true }],
	price: { type: String, required: true },
	basisPrice: { type: String, required: true },
	expirationDate: { type: Date, required: true },
	url: { type: String, required: true },
	// description: { type: String, required: true },
	// category: { type: String, required: true },
});

export default mongoose.model<DealDocument>('Deal', DealSchema);
