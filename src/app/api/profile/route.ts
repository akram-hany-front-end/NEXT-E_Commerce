import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/app/models/Profile";
import User from "@/app/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
type PopulatedUser = {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
};
// =========================
// GET PROFILE
// =========================


export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findById(session.user.id)
            .select("-password")
            .lean();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                profile: user,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET PROFILE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch profile",
            },
            { status: 500 }
        );
    }
}
// =========================
// UPDATE PROFILE
// =========================
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();

        const {
            name,
            email,
            phone,
            avatar,
            address,
            currentPassword,
            newPassword,
        } = body;

        // =========================
        // FIND USER
        // =========================

        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // =========================
        // UPDATE USER INFO
        // =========================

        if (name !== undefined) {
            user.name = name.trim();
        }

        if (email !== undefined) {
            user.email = email.trim().toLowerCase();
        }

        if (phone !== undefined) {
            user.phone = phone.trim();
        }

        // =========================
        // UPDATE PASSWORD
        // =========================

        if (currentPassword || newPassword) {

            if (!currentPassword || !newPassword) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Current password and new password are required",
                    },
                    { status: 400 }
                );
            }

            const isPasswordValid = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!isPasswordValid) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Current password is incorrect",
                    },
                    { status: 400 }
                );
            }

            if (newPassword.length < 6) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "New password must be at least 6 characters",
                    },
                    { status: 400 }
                );
            }

            user.password = await bcrypt.hash(
                newPassword,
                12
            );
        }

        // Save User
        await user.save();

        // =========================
        // UPDATE PROFILE
        // =========================

        let profile = await Profile.findOne({
            user: session.user.id,
        });

        if (!profile) {
            profile = new Profile({
                user: session.user.id,
            });
        }

        if (avatar !== undefined) {
            profile.avatar = avatar?.trim() || "";
        }

        if (address !== undefined) {
            profile.address = {
                governorate:
                    address.governorate?.trim() || "",

                city:
                    address.city?.trim() || "",

                details:
                    address.details?.trim() || "",
            };
        }

        await profile.save();

        // =========================
        // GET UPDATED DATA
        // =========================

        const updatedProfile = await Profile.findOne({
            user: session.user.id,
        })
            .populate("user", "name email role")
            .lean();

        if (!updatedProfile) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Profile not found after update",
                },
                { status: 404 }
            );
        }

        const updatedUser =
            updatedProfile.user as unknown as PopulatedUser;

        // =========================
        // RESPONSE
        // =========================

        return NextResponse.json(
            {
                success: true,
                message: "Profile updated successfully",

                profile: {
                    _id: updatedProfile._id,

                    name: updatedUser.name,

                    email: updatedUser.email,

                    role: updatedUser.role,

                    phone: user.phone || "",

                    avatar: updatedProfile.avatar || "",

                    address: {
                        city:
                            updatedProfile.address?.city || "",

                        governorate:
                            updatedProfile.address?.governorate || "",

                        details:
                            updatedProfile.address?.details || "",
                    },
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update profile",
            },
            { status: 500 }
        );
    }
}