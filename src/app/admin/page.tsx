"use client";

import Link from "next/link";
import {
    Package,
    ShoppingBag,
    Users,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    Clock3,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
} from "lucide-react";

const stats = [
    {
        title: "Total Sales",
        value: "125,800 EGP",
        change: "+12.5%",
        icon: TrendingUp,
    },
    {
        title: "Orders",
        value: "248",
        change: "+8.2%",
        icon: ShoppingBag,
    },
    {
        title: "Products",
        value: "86",
        change: "+4.6%",
        icon: Package,
    },
    {
        title: "Users",
        value: "1,248",
        change: "+10.4%",
        icon: Users,
    },
];

const recentOrders = [
    {
        id: "ORD-10021",
        customer: "Ahmed Mohamed",
        product: "Modern Sofa",
        total: "12,500 EGP",
        status: "Paid",
    },
    {
        id: "ORD-10020",
        customer: "Sara Ali",
        product: "Luxury Armchair",
        total: "6,500 EGP",
        status: "Pending",
    },
    {
        id: "ORD-10019",
        customer: "Omar Hassan",
        product: "Dining Table",
        total: "18,000 EGP",
        status: "Paid",
    },
    {
        id: "ORD-10018",
        customer: "Mona Ahmed",
        product: "Bedroom Set",
        total: "25,000 EGP",
        status: "Processing",
    },
];

const activities = [
    {
        text: "New order received",
        time: "5 minutes ago",
        icon: ShoppingBag,
    },
    {
        text: "New user registered",
        time: "18 minutes ago",
        icon: Users,
    },
    {
        text: "New message received",
        time: "32 minutes ago",
        icon: MessageSquare,
    },
    {
        text: "Product stock is low",
        time: "1 hour ago",
        icon: AlertCircle,
    },
];

export default function AdminDashboard() {
    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-8">

            {/* =========================
          Header
      ========================= */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="mb-1 text-sm text-[var(--primary)]">
                        Welcome back
                    </p>

                    <h1 className="text-3xl font-bold text-[var(--foreground)]">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Manage your Arkan store from one place.
                    </p>
                </div>

                <Link
                    href="/admin/products"
                    className="flex w-fit items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                    <Package size={18} />
                    Manage Products
                </Link>

            </div>

            {/* =========================
          Stats
      ========================= */}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
                        >
                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-sm text-[var(--muted)]">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                                        {stat.value}
                                    </h2>

                                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
                                        <TrendingUp size={13} />
                                        {stat.change}
                                        <span className="font-normal text-[var(--muted)]">
                                            this month
                                        </span>
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[var(--primary)]/10 p-3">
                                    <Icon
                                        size={22}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                            </div>
                        </div>
                    );
                })}

            </section>

            {/* =========================
          Main Content
      ========================= */}

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* =========================
            Recent Orders
        ========================= */}

                <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] xl:col-span-2">

                    <div className="flex items-center justify-between border-b border-[var(--border)] p-5">

                        <div>
                            <h2 className="font-bold text-[var(--foreground)]">
                                Recent Orders
                            </h2>

                            <p className="mt-1 text-xs text-[var(--muted)]">
                                Latest orders from your customers
                            </p>
                        </div>

                        <Link
                            href="/admin/orders"
                            className="flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline"
                        >
                            View All
                            <ChevronRight size={16} />
                        </Link>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[650px] text-sm">

                            <thead className="border-b border-[var(--border)] bg-[var(--background)]">

                                <tr>
                                    <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                        Order
                                    </th>

                                    <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                        Customer
                                    </th>

                                    <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                        Product
                                    </th>

                                    <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                        Total
                                    </th>

                                    <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                        Status
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-[var(--border)]">

                                {recentOrders.map((order) => (

                                    <tr
                                        key={order.id}
                                        className="transition hover:bg-[var(--background)]"
                                    >

                                        <td className="px-5 py-4 font-semibold text-[var(--primary)]">
                                            {order.id}
                                        </td>

                                        <td className="px-5 py-4 text-[var(--foreground)]">
                                            {order.customer}
                                        </td>

                                        <td className="px-5 py-4 text-[var(--muted)]">
                                            {order.product}
                                        </td>

                                        <td className="px-5 py-4 font-medium text-[var(--foreground)]">
                                            {order.total}
                                        </td>

                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${order.status === "Paid"
                                                        ? "bg-green-500/10 text-green-600"
                                                        : order.status === "Pending"
                                                            ? "bg-yellow-500/10 text-yellow-600"
                                                            : "bg-blue-500/10 text-blue-600"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </section>

                {/* =========================
            Activity
        ========================= */}

                <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">

                    <div className="border-b border-[var(--border)] p-5">

                        <h2 className="font-bold text-[var(--foreground)]">
                            Recent Activity
                        </h2>

                        <p className="mt-1 text-xs text-[var(--muted)]">
                            Latest activity in your store
                        </p>

                    </div>

                    <div className="divide-y divide-[var(--border)]">

                        {activities.map((activity, index) => {
                            const Icon = activity.icon;

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-5"
                                >

                                    <div className="shrink-0 rounded-lg bg-[var(--primary)]/10 p-2.5">
                                        <Icon
                                            size={18}
                                            className="text-[var(--primary)]"
                                        />
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-sm font-medium text-[var(--foreground)]">
                                            {activity.text}
                                        </p>

                                        <p className="mt-1 flex items-center gap-1 text-xs text-[var(--muted)]">
                                            <Clock3 size={12} />
                                            {activity.time}
                                        </p>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </section>

            </div>

            {/* =========================
          Quick Actions
      ========================= */}

            <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">

                <div className="mb-5">
                    <h2 className="font-bold text-[var(--foreground)]">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                        Quickly access the most important sections.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    <QuickAction
                        href="/admin/products"
                        icon={Package}
                        title="Products"
                        description="Manage products"
                    />

                    <QuickAction
                        href="/admin/orders"
                        icon={ShoppingBag}
                        title="Orders"
                        description="View customer orders"
                    />

                    <QuickAction
                        href="/admin/users"
                        icon={Users}
                        title="Users"
                        description="Manage users"
                    />

                    <QuickAction
                        href="/admin/messages"
                        icon={MessageSquare}
                        title="Messages"
                        description="View messages"
                    />

                </div>

            </section>

        </main>
    );
}

/* =========================
Quick Action Component
========================= */

function QuickAction({
    href,
    icon: Icon,
    title,
    description,
}: {
    href: string;
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition hover:border-[var(--primary)]"
        >

            <div className="rounded-lg bg-[var(--primary)]/10 p-3">
                <Icon
                    size={20}
                    className="text-[var(--primary)]"
                />
            </div>

            <div className="flex-1">

                <h3 className="font-medium text-[var(--foreground)]">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-[var(--muted)]">
                    {description}
                </p>

            </div>

            <ArrowUpRight
                size={18}
                className="text-[var(--muted)] transition group-hover:text-[var(--primary)]"
            />

        </Link>
    );
}