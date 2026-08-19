import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            governorate: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            details: {
                type: String,
                required: true,
            },
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    {
        timestamps: true,
    }
);

const User =
    models.User || model("User", UserSchema);

export default User;