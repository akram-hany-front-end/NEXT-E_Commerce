"use client";

import { useState } from "react";
import {
    Search,
    ShoppingBag,
    Eye,
    MoreVertical,
} from "lucide-react";

type Order = {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    product: {
        name: string;
        quantity: number;
        price: number;
    };
    total: number;
    paymentMethod: "paid" | "cash_on_delivery";
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    date: string;
};

const ordersData: Order[] = [
    {
        id: "ARK-10001",
        customer: {
            name: "Ahmed Mohamed",
            email: "ahmed@example.com",
            phone: "01012345678",
            address: "Mansoura, Egypt",
        },
        product: {
            name: "Modern Sofa",
            quantity: 2,
            price: 12500,
        },
        total: 25000,
        paymentMethod: "paid",
        status: "processing",
        date: "Aug 18, 2026",
    },
    {
        id: "ARK-10002",
        customer: {
            name: "Sara Ali",
            email: "sara@example.com",
            phone: "01198765432",
            address: "Cairo, Egypt",
        },
        product: {
            name: "Wooden Dining Table",
            quantity: 1,
            price: 18000,
        },
        total: 18000,
        paymentMethod: "cash_on_delivery",
        status: "pending",
        date: "Aug 18, 2026",
    },
    {
        id: "ARK-10003",
        customer: {
            name: "Omar Hassan",
            email: "omar@example.com",
            phone: "01255555555",
            address: "Alexandria, Egypt",
        },
        product: {
            name: "Luxury Armchair",
            quantity: 3,
            price: 6500,
        },
        total: 19500,
        paymentMethod: "paid",
        status: "shipped",
        date: "Aug 17, 2026",
    },
];

export default function OrdersPage() {
    const [orders] = useState<Order[]>(ordersData);
    const [search, setSearch] = useState("");

    const filteredOrders = orders.filter((order) => {
        const value = search.toLowerCase();

        return (
            order.id.toLowerCase().includes(value) ||
            order.customer.name.toLowerCase().includes(value) ||
            order.customer.email.toLowerCase().includes(value) ||
            order.product.name.toLowerCase().includes(value)
        );
    });

    const getStatusStyle = (status: Order["status"]) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/10 text-yellow-600";

            case "processing":
                return "bg-blue-500/10 text-blue-600";

            case "shipped":
                return "bg-purple-500/10 text-purple-600";

            case "delivered":
                return "bg-green-500/10 text-green-600";

            case "cancelled":
                return "bg-red-500/10 text-red-600";
        }
    };

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>
                    <div className="flex items-center gap-3">
                        <ShoppingBag
                            size={28}
                            className="text-[var(--primary)]"
                        />

                        <h1 className="text-3xl font-bold text-[var(--foreground)]">
                            Orders
                        </h1>
                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Manage customer orders and payment information.
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search
                        size={18}
                        className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search orders..."
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                    />
                </div>

            </div>

            {/* Orders */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full text-sm">

                        <thead className="border-b border-[var(--border)] bg-[var(--background)]">
                            <tr className="text-start">

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Order ID
                                </th>

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Customer
                                </th>

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Product
                                </th>

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Qty
                                </th>

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Total
                                </th>

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Payment
                                </th>

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Status
                                </th>

                                <th className="px-5 py-4 font-semibold text-[var(--foreground)]">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[var(--border)]">

                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="transition hover:bg-[var(--background)]"
                                >

                                    {/* ID */}
                                    <td className="px-5 py-5 font-semibold text-[var(--primary)]">
                                        {order.id}
                                    </td>

                                    {/* Customer */}
                                    <td className="px-5 py-5">

                                        <div>
                                            <p className="font-medium text-[var(--foreground)]">
                                                {order.customer.name}
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--muted)]">
                                                {order.customer.email}
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--muted)]">
                                                {order.customer.phone}
                                            </p>

                                        </div>

                                    </td>

                                    {/* Product */}
                                    <td className="px-5 py-5">

                                        <p className="font-medium text-[var(--foreground)]">
                                            {order.product.name}
                                        </p>

                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            {order.product.price.toLocaleString()} EGP
                                        </p>

                                    </td>

                                    {/* Quantity */}
                                    <td className="px-5 py-5 text-[var(--foreground)]">
                                        {order.product.quantity}
                                    </td>

                                    {/* Total */}
                                    <td className="px-5 py-5 font-semibold text-[var(--foreground)]">
                                        {order.total.toLocaleString()} EGP
                                    </td>

                                    {/* Payment */}
                                    <td className="px-5 py-5">

                                        {order.paymentMethod === "paid" ? (
                                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-600">
                                                Cash on Delivery
                                            </span>
                                        )}

                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>

                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-5">

                                        <div className="flex items-center gap-2">

                                            <button
                                                title="View order"
                                                className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                            >
                                                <Eye size={17} />
                                            </button>

                                            <button
                                                title="More"
                                                className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                            >
                                                <MoreVertical size={17} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Mobile Cards */}
                <div className="divide-y divide-[var(--border)] md:hidden">

                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="p-5"
                        >

                            {/* Order Header */}
                            <div className="flex items-center justify-between">

                                <span className="font-semibold text-[var(--primary)]">
                                    {order.id}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            {/* Customer */}
                            <div className="mt-5">

                                <p className="font-semibold text-[var(--foreground)]">
                                    {order.customer.name}
                                </p>

                                <p className="mt-1 text-sm text-[var(--muted)]">
                                    {order.customer.email}
                                </p>

                                <p className="mt-1 text-sm text-[var(--muted)]">
                                    {order.customer.phone}
                                </p>

                                <p className="mt-1 text-sm text-[var(--muted)]">
                                    {order.customer.address}
                                </p>

                            </div>

                            {/* Product */}
                            <div className="mt-5 rounded-lg bg-[var(--background)] p-4">

                                <p className="font-medium text-[var(--foreground)]">
                                    {order.product.name}
                                </p>

                                <div className="mt-2 flex items-center justify-between text-sm">

                                    <span className="text-[var(--muted)]">
                                        Quantity: {order.product.quantity}
                                    </span>

                                    <span className="font-medium text-[var(--foreground)]">
                                        {order.product.price.toLocaleString()} EGP
                                    </span>

                                </div>

                            </div>

                            {/* Payment */}
                            <div className="mt-5 flex items-center justify-between">

                                <span className="text-sm text-[var(--muted)]">
                                    Payment
                                </span>

                                {order.paymentMethod === "paid" ? (
                                    <span className="font-medium text-green-600">
                                        Paid
                                    </span>
                                ) : (
                                    <span className="font-medium text-orange-600">
                                        Cash on Delivery
                                    </span>
                                )}

                            </div>

                            {/* Total */}
                            <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3">

                                <span className="font-semibold text-[var(--foreground)]">
                                    Total
                                </span>

                                <span className="text-lg font-bold text-[var(--primary)]">
                                    {order.total.toLocaleString()} EGP
                                </span>

                            </div>

                            {/* Actions */}
                            <div className="mt-5 flex gap-2">

                                <button
                                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--border)] py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--background)]"
                                >
                                    <Eye size={16} />
                                    View Order
                                </button>

                                <button
                                    className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)]"
                                >
                                    <MoreVertical size={17} />
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">

                    <ShoppingBag
                        size={40}
                        className="mb-4 text-[var(--muted)]"
                    />

                    <h2 className="text-lg font-semibold text-[var(--foreground)]">
                        No orders found
                    </h2>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        There are no orders matching your search.
                    </p>

                </div>
            )}

        </main>
    );
}