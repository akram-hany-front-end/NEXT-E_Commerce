import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/app/models/Message";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(
    request: Request,
    { params }: Params
) {
    try {
        await connectDB();

        const { id } = await params;

        const body = await request.json();

        const { reply, status } = body;

        const message = await Message.findById(id);

        if (!message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Message not found",
                },
                { status: 404 }
            );
        }

        // Admin reply
        if (reply) {
            message.reply = reply;
            message.repliedAt = new Date();
            message.status = "REPLIED";
        }

        // Change status
        if (status) {
            if (!["UNREAD", "READ", "REPLIED"].includes(status)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Invalid status",
                    },
                    { status: 400 }
                );
            }

            message.status = status;
        }

        await message.save();

        return NextResponse.json(
            {
                success: true,
                message: "Message updated successfully",
                data: message,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Reply message error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update message",
            },
            { status: 500 }
        );
    }
}
export async function DELETE(
    request: Request,
    { params }: Params
) {
    try {
        await connectDB();

        const { id } = await params;

        const message = await Message.findById(id);

        if (!message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Message not found",
                },
                { status: 404 }
            );
        }

        await Message.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message: "Message deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete message error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete message",
            },
            { status: 500 }
        );
    }
}