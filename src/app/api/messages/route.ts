import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/app/models/Message";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            user,
            name,
            email,
            phone,
            subject,
            message,
        } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name, email, subject and message are required",
                },
                { status: 400 }
            );
        }

        const newMessage = await Message.create({
            user: user || undefined,
            name,
            email,
            phone,
            subject,
            message,
            status: "UNREAD",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Message sent successfully",
                data: newMessage,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Send message error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to send message",
            },
            { status: 500 }
        );
    }
}
export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("user");

        console.log("USER ID:", userId);

        const filter = userId
            ? { user: userId }
            : {};

        console.log("FILTER:", filter);

        const messages = await Message.find(filter)
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .lean();

        console.log("MESSAGES:", messages);

        return NextResponse.json(
            {
                success: true,
                messages,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Get messages error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch messages",
            },
            { status: 500 }
        );
    }
}