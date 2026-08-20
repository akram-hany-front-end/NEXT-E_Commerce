import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../../../../auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/app/models/Order";
import Product from "@/app/models/Product";


// =========================
// GET ORDERS
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
                {
                    status: 401,
                }
            );
        }

        await connectDB();

        const isAdmin =
            session.user.role === "ADMIN";

        const filter = isAdmin
            ? {}
            : {
                user: session.user.id,
            };

        const orders = await Order.find(filter)
            .populate(
                "user",
                "name email"
            )
            .populate(
                "items.product",
                "name price images"
            )
            .sort({
                createdAt: -1,
            })
            .lean();

        return NextResponse.json(
            {
                success: true,
                orders,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(
            "GET ORDERS ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch orders",
            },
            {
                status: 500,
            }
        );
    }
}


// =========================
// CREATE ORDER
// =========================

export async function POST(
    request: Request
) {
    try {
        const session =
            await getServerSession(
                authOptions
            );

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        await connectDB();

        const body = await request.json();

        const {
            items,
            shippingPrice = 0,
            paymentMethod,
            shippingAddress,
        } = body;

        // =========================
        // Validate items
        // =========================

        if (
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Order must contain at least one item",
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // Validate payment method
        // =========================

        if (
            paymentMethod !== "COD" &&
            paymentMethod !== "CARD"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid payment method",
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // Validate shipping address
        // =========================

        if (
            !shippingAddress?.fullName ||
            !shippingAddress?.phone ||
            !shippingAddress?.governorate ||
            !shippingAddress?.city ||
            !shippingAddress?.details
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Complete shipping address is required",
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // Get products from DB
        // =========================

        const productIds = items.map(
            (item: {
                product: string;
            }) => item.product
        );

        const products =
            await Product.find({
                _id: {
                    $in: productIds,
                },
            }).lean();

        if (
            products.length !==
            productIds.length
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "One or more products were not found",
                },
                {
                    status: 404,
                }
            );
        }

        // =========================
        // Build order items
        // =========================

        const orderItems = items.map(
            (item: {
                product: string;
                quantity: number;
            }) => {
                const product =
                    products.find(
                        (p) =>
                            p._id.toString() ===
                            item.product
                    );

                if (!product) {
                    throw new Error(
                        "Product not found"
                    );
                }

                const quantity =
                    Number(item.quantity);

                if (
                    !Number.isInteger(quantity) ||
                    quantity < 1
                ) {
                    throw new Error(
                        "Invalid product quantity"
                    );
                }

                return {
                    product: product._id,

                    name: product.name,

                    price: product.price,

                    quantity,

                    image:
                        product.images?.[0] ||
                        undefined,
                };
            }
        );

        // =========================
        // Calculate prices
        // =========================

        const subtotal =
            orderItems.reduce(
                (total, item) =>
                    total +
                    item.price *
                        item.quantity,
                0
            );

        const shipping =
            Number(shippingPrice);

        if (
            Number.isNaN(shipping) ||
            shipping < 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid shipping price",
                },
                {
                    status: 400,
                }
            );
        }

        const totalPrice =
            subtotal + shipping;

        // =========================
        // Payment status
        // =========================

        const paymentStatus =
            paymentMethod === "COD"
                ? "PENDING"
                : "PENDING";

        // =========================
        // Generate order ID
        // =========================

        const orderId =
            `ORD-${Date.now()}`;

        // =========================
        // Create order
        // =========================

        const order =
            await Order.create({
                user: session.user.id,

                orderId,

                items: orderItems,

                subtotal,

                shippingPrice:
                    shipping,

                totalPrice,

                paymentMethod,

                paymentStatus,

                orderStatus:
                    "PENDING",

                shippingAddress: {
                    fullName:
                        shippingAddress.fullName.trim(),

                    phone:
                        shippingAddress.phone.trim(),

                    governorate:
                        shippingAddress.governorate.trim(),

                    city:
                        shippingAddress.city.trim(),

                    details:
                        shippingAddress.details.trim(),
                },
            });

        return NextResponse.json(
            {
                success: true,
                message:
                    "Order created successfully",
                order,
            },
            {
                status: 201,
            }
        );

    } catch (error) {
        console.error(
            "CREATE ORDER ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to create order",
            },
            {
                status: 500,
            }
        );
    }
}
