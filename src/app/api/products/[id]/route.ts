import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Product from "@/app/models/Product";
import Category from "@/app/models/Category";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function PATCH(
    request: Request,
    context: RouteContext
) {
    try {
        await connectDB();

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid product ID",
                },
                { status: 400 }
            );
        }

        const body = await request.json();

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        const {
            name,
            slug,
            description,
            price,
            oldPrice,
            category,
            images,
            stock,
            isActive,
            isFeatured,
        } = body;

        if (category) {
            const categoryExists =
                await Category.findById(category);

            if (!categoryExists) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Category not found",
                    },
                    { status: 404 }
                );
            }

            product.category = category;
        }

        if (name !== undefined) {
            product.name = name.trim();
        }

        if (slug !== undefined) {
            product.slug = slug.trim().toLowerCase();
        }

        if (description !== undefined) {
            product.description =
                description.trim();
        }

        if (price !== undefined) {
            product.price = Number(price);
        }

        if (oldPrice !== undefined) {
            product.oldPrice =
                oldPrice === ""
                    ? undefined
                    : Number(oldPrice);
        }

        if (images !== undefined) {
            product.images = Array.isArray(images)
                ? images
                : [];
        }

        if (stock !== undefined) {
            product.stock = Number(stock);
        }

        if (isActive !== undefined) {
            product.isActive = Boolean(isActive);
        }

        if (isFeatured !== undefined) {
            product.isFeatured = Boolean(isFeatured);
        }

        await product.save();

        const updatedProduct =
            await Product.findById(id)
                .populate("category")
                .lean();

        return NextResponse.json(
            {
                success: true,
                message: "Product updated successfully",
                product: updatedProduct,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update product",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    context: RouteContext
) {
    try {
        await connectDB();

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid product ID",
                },
                { status: 400 }
            );
        }

        const product =
            await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Product deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete product",
            },
            { status: 500 }
        );
    }
}