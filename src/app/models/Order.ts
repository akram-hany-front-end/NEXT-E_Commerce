import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrderItem {
    product: mongoose.Types.ObjectId;

    name: string;
    price: number;
    quantity: number;

    image?: string;
}

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;

    orderId: string;

    items: IOrderItem[];

    subtotal: number;
    shippingPrice: number;
    totalPrice: number;

    paymentMethod: "COD" | "CARD";
    paymentStatus: "PENDING" | "PAID" | "FAILED";

    orderStatus:
        | "PENDING"
        | "CONFIRMED"
        | "PROCESSING"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELLED";

    shippingAddress: {
        fullName: string;
        phone: string;
        governorate: string;
        city: string;
        details: string;
    };

    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        image: {
            type: String,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const OrderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        items: {
            type: [OrderItemSchema],
            required: true,
            validate: {
                validator: (items: IOrderItem[]) =>
                    items.length > 0,
                message: "Order must contain at least one item",
            },
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        shippingPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "CARD"],
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
        },

        orderStatus: {
            type: String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
            ],
            default: "PENDING",
        },

        shippingAddress: {
            fullName: {
                type: String,
                required: true,
                trim: true,
            },

            phone: {
                type: String,
                required: true,
                trim: true,
            },

            governorate: {
                type: String,
                required: true,
                trim: true,
            },

            city: {
                type: String,
                required: true,
                trim: true,
            },

            details: {
                type: String,
                required: true,
                trim: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Order: Model<IOrder> =
    mongoose.models.Order ||
    mongoose.model<IOrder>("Order", OrderSchema);

export default Order;

