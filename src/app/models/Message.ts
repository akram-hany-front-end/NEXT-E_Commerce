import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
    user?: mongoose.Types.ObjectId;

    name: string;
    email: string;
    phone?: string;

    subject: string;
    message: string;

    status: "UNREAD" | "READ" | "REPLIED";

    reply?: string;

    repliedAt?: Date;

    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["UNREAD", "READ", "REPLIED"],
            default: "UNREAD",
        },

        reply: {
            type: String,
            trim: true,
        },

        repliedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Message: Model<IMessage> =
    mongoose.models.Message ||
    mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
