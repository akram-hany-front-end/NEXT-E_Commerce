import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../../../../../auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/app/models/Order";


// =========================
// GET ORDER BY ID
// =========================

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
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

        const { id } = await params;

        const order =
            await Order.findOne({
                _id: id,
                ...(session.user.role ===
                "ADMIN"
                    ? {}
                    : {
                        user:
                            session.user.id,
                    }),
            })
                .populate(
                    "user",
                    "name email"
                )
                .populate(
                    "items.product",
                    "name price images"
                )
                .lean();

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Order not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                order,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(
            "GET ORDER ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch order",
            },
            {
                status: 500,
            }
        );
    }
}


// =========================
// UPDATE ORDER
// =========================

export async function PATCH(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
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

        // Only Admin can update orders
        if (
            session.user.role !==
            "ADMIN"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Forbidden",
                },
                {
                    status: 403,
                }
            );
        }

        await connectDB();

        const { id } = await params;

        const body =
            await request.json();

        const {
            paymentStatus,
            orderStatus,
        } = body;

        const allowedPaymentStatuses =
            [
                "PENDING",
                "PAID",
                "FAILED",
            ];

        const allowedOrderStatuses =
            [
                "PENDING",
                "CONFIRMED",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
            ];

        if (
            paymentStatus !== undefined &&
            !allowedPaymentStatuses.includes(
                paymentStatus
            )
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid payment status",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            orderStatus !== undefined &&
            !allowedOrderStatuses.includes(
                orderStatus
            )
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid order status",
                },
                {
                    status: 400,
                }
            );
        }

        const updateData: Record<
            string,
            string
        > = {};

        if (
            paymentStatus !== undefined
        ) {
            updateData.paymentStatus =
                paymentStatus;
        }

        if (
            orderStatus !== undefined
        ) {
            updateData.orderStatus =
                orderStatus;
        }

        if (
            Object.keys(updateData)
                .length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "No fields to update",
                },
                {
                    status: 400,
                }
            );
        }

        const order =
            await Order.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            )
                .populate(
                    "user",
                    "name email"
                )
                .lean();

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Order not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message:
                    "Order updated successfully",
                order,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(
            "UPDATE ORDER ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to update order",
            },
            {
                status: 500,
            }
        );
    }
}


// =========================
// DELETE ORDER
// =========================

export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
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

        // Only Admin can delete orders
        if (
            session.user.role !==
            "ADMIN"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Forbidden",
                },
                {
                    status: 403,
                }
            );
        }

        await connectDB();

        const { id } = await params;

        const order =
            await Order.findByIdAndDelete(
                id
            );

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Order not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message:
                    "Order deleted successfully",
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(
            "DELETE ORDER ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to delete order",
            },
            {
                status: 500,
            }
        );
    }
}