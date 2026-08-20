import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProfile extends Document {
    user: mongoose.Types.ObjectId;

    phone?: string;

    avatar?: string;

    address?: {
        governorate?: string;
        city?: string;
        details?: string;
    };

    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        avatar: {
            type: String,
            trim: true,
        },

        address: {
            governorate: {
                type: String,
                trim: true,
            },

            city: {
                type: String,
                trim: true,
            },

            details: {
                type: String,
                trim: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Profile: Model<IProfile> =
    mongoose.models.Profile ||
    mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
