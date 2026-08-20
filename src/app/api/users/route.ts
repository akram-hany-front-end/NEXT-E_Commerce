import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";

// GET  
export async function GET() {
    try {
        await connectDB();

        const users = await User.find({})
            .select("-password")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                success: true,
                users,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get users error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch users",
            },
            { status: 500 }
        );
    }
}


// DELETE 
export async function DELETE(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID is required",
                },
                { status: 400 }
            );
        }

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Prevent deleting admin
        if (user.role === "ADMIN") {
            return NextResponse.json(
                {
                    success: false,
                    message: "You cannot delete an admin",
                },
                { status: 403 }
            );
        }

        await User.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message: "User deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete user error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete user",
            },
            { status: 500 }
        );
    }
}