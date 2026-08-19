import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            email,
            phone,
            address,
            password,
            confirmPassword,
        } = body;

        // Check required fields
        if (
            !name ||
            !email ||
            !phone ||
            !address?.governorate ||
            !address?.city ||
            !address?.details ||
            !password ||
            !confirmPassword
        ) {
            return NextResponse.json(
                {
                    message: "All fields are requireddasdd",
                },
                { status: 400 }
            );
        }

        // Check passwords
        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    message: "Passwords do not match",
                },
                { status: 400 }
            );
        }

        // Connect MongoDB
        await connectDB();

        // Check existing user
        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    message: "User already exists",
                },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            phone,

            address: {
                governorate: address.governorate,
                city: address.city,
                details: address.details,
            },

            password: hashedPassword,

            role: "USER",
        });

        return NextResponse.json(
            {
                message: "Account created successfully",

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("REGISTER_ERROR:", error);

        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}