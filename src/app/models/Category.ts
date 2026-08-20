import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },

        description: {
            type: String,
            trim: true,
        },

        image: {
            type: String,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category: Model<ICategory> =
    mongoose.models.Category ||
    mongoose.model<ICategory>("Category", CategorySchema);

export default Category;