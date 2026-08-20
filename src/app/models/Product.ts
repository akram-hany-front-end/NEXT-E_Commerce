import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;

    price: number;
    oldPrice?: number;

category: mongoose.Types.ObjectId;

    images: string[];

    stock: number;

    isActive: boolean;
    isFeatured: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        oldPrice: {
            type: Number,
            min: 0,
        },

        category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
},

        images: {
            type: [String],
            required: true,
            default: [],
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product: Model<IProduct> =
    mongoose.models.Product ||
    mongoose.model<IProduct>("Product", ProductSchema);

export default Product;