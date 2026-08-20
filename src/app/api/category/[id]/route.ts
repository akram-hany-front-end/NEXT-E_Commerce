import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/app/models/Category";


// GET CATEGORY BY ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                category,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error("GET CATEGORY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch category",
            },
            {
                status: 500,
            }
        );
    }
}


// UPDATE CATEGORY
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const body = await request.json();

        const {
            name,
            slug,
            description,
            image,
            isActive,
        } = body;

        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Check duplicate name
        if (name && name.trim() !== category.name) {
            const existingName = await Category.findOne({
                name: name.trim(),
                _id: { $ne: id },
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

            category.name = name.trim();
        }

        // Check duplicate slug
        if (
            slug &&
            slug.toLowerCase().trim() !== category.slug
        ) {
            const existingSlug = await Category.findOne({
                slug: slug.toLowerCase().trim(),
                _id: { $ne: id },
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

            category.slug = slug.toLowerCase().trim();
        }

        if (description !== undefined) {
            category.description =
                description?.trim();
        }

        if (image !== undefined) {
            category.image = image;
        }

        if (typeof isActive === "boolean") {
            category.isActive = isActive;
        }

        await category.save();

        return NextResponse.json(
            {
                success: true,
                message: "Category updated successfully",
                category,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error("UPDATE CATEGORY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update category",
            },
            {
                status: 500,
            }
        );
    }
}


// DELETE CATEGORY
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                {
                    status: 404,
                }
            );
        }

        await Category.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message: "Category deleted successfully",
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error("DELETE CATEGORY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete category",
            },
            {
                status: 500,
            }
        );
    }
}

