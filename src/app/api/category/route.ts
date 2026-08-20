import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/app/models/Category";


// GET ALL CATEGORIES
export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find()
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                success: true,
                categories,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error("GET CATEGORIES ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch categories",
            },
            {
                status: 500,
            }
        );
    }
}


// CREATE CATEGORY
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            name,
            slug,
            description,
            image,
            isActive,
        } = body;

        // Required fields
        if (!name || !slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name and slug are required",
                },
                {
                    status: 400,
                }
            );
        }

        // Check duplicate name
        const existingName = await Category.findOne({
            name: name.trim(),
        });

        if (existingName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category name already exists",
                },
                {
                    status: 409,
                }
            );
        }

        // Check duplicate slug
        const existingSlug = await Category.findOne({
            slug: slug.toLowerCase().trim(),
        });

        if (existingSlug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category slug already exists",
                },
                {
                    status: 409,
                }
            );
        }

        const category = await Category.create({
            name: name.trim(),
            slug: slug.toLowerCase().trim(),
            description: description?.trim(),
            image,
            isActive:
                typeof isActive === "boolean"
                    ? isActive
                    : true,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Category created successfully",
                category,
            },
            {
                status: 201,
            }
        );

    } catch (error) {
        console.error("CREATE CATEGORY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create category",
            },
            {
                status: 500,
            }
        );
    }
}

