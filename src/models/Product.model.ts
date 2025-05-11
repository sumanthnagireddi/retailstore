import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  tags: string[];
  attributes?: {
    color?: string;
    features?: string[];
    screenSize?: string;
    resolution?: string;
    size?: string;
    [key: string]: string | string[] | undefined;
  };
  rating: number;
  numReviews: number;
  reviews: Types.ObjectId[];
  vendor: Types.ObjectId;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, required: true, min: 0 },
    images: [{ type: String, required: true }],
    tags: [{ type: String }],
    
    attributes: {
      type: Map,
      of: Schema.Types.Mixed, 
    },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Products", productSchema);
