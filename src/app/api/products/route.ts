import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/app/models/Product";
import Category from "@/app/models/Category";

export async function GET() {
    try {
        await connectDB();

        const products = await Product.find()
            .populate("category")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                success: true,
                products,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch products",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

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

        if (
            !name ||
            !slug ||
            !description ||
            price === undefined ||
            !category
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Required fields are missing",
                },
                { status: 400 }
            );
        }

        const existingProduct = await Product.findOne({
            $or: [
                { name },
                { slug: slug.toLowerCase() },
            ],
        });

        if (existingProduct) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Product with this name or slug already exists",
                },
                { status: 409 }
            );
        }

        const categoryExists = await Category.findById(
            category
        );

        if (!categoryExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                { status: 404 }
            );
        }

        const product = await Product.create({
            name: name.trim(),
            slug: slug.trim().toLowerCase(),
            description: description.trim(),
            price: Number(price),
            oldPrice:
                oldPrice !== undefined &&
                oldPrice !== ""
                    ? Number(oldPrice)
                    : undefined,
            category,
            images: Array.isArray(images)
                ? images
                : [],
            stock: Number(stock ?? 0),
            isActive:
                isActive !== undefined
                    ? Boolean(isActive)
                    : true,
            isFeatured:
                isFeatured !== undefined
                    ? Boolean(isFeatured)
                    : false,
        });

        const populatedProduct =
            await Product.findById(product._id)
                .populate("category")
                .lean();

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully",
                product: populatedProduct,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create product",
            },
            { status: 500 }
        );
    }
}