"use client";

import { useState } from "react";
import {
    Search,
    Users,
    Eye,
    Trash2,
    MoreVertical,
} from "lucide-react";

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "user" | "admin";
    city: string;
    joinedAt: string;
    status: "active" | "blocked";
};

const usersData: User[] = [
    {
        id: "USR-10001",
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        phone: "01012345678",
        role: "user",
        city: "Mansoura",
        joinedAt: "Aug 18, 2026",
        status: "active",
    },
    {
        id: "USR-10002",
        name: "Sara Ali",
        email: "sara@example.com",
        phone: "01198765432",
        role: "user",
        city: "Cairo",
        joinedAt: "Aug 17, 2026",
        status: "active",
    },
    {
        id: "USR-10003",
        name: "Omar Hassan",
        email: "omar@example.com",
        phone: "01255555555",
        role: "user",
        city: "Alexandria",
        joinedAt: "Aug 16, 2026",
        status: "blocked",
    },
    {
        id: "USR-10004",
        name: "Admin Arkan",
        email: "admin@arkan.com",
        phone: "01000000000",
        role: "admin",
        city: "Mansoura",
        joinedAt: "Aug 10, 2026",
        status: "active",
    },
];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>(usersData);
    const [search, setSearch] = useState("");

    const filteredUsers = users.filter((user) => {
        const value = search.toLowerCase();

        return (
            user.id.toLowerCase().includes(value) ||
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value) ||
            user.phone.includes(value) ||
            user.city.toLowerCase().includes(value)
        );
    });

    const deleteUser = (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );
    };

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>
                    <div className="flex items-center gap-3">
                        <Users
                            size={28}
                            className="text-[var(--primary)]"
                        />

                        <h1 className="text-3xl font-bold text-[var(--foreground)]">
                            Users
                        </h1>
                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Manage registered users and their accounts.
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
                        placeholder="Search users..."
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                    />
                </div>

            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">

                {/* Desktop */}
                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full text-sm">

                        <thead className="border-b border-[var(--border)] bg-[var(--background)]">

                            <tr>
                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    User ID
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    User
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Phone
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    City
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Joined
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Actions
                                </th>
                            </tr>

                        </thead>

                        <tbody className="divide-y divide-[var(--border)]">

                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition hover:bg-[var(--background)]"
                                >

                                    {/* ID */}
                                    <td className="px-5 py-5 font-semibold text-[var(--primary)]">
                                        {user.id}
                                    </td>

                                    {/* User */}
                                    <td className="px-5 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 font-semibold text-[var(--primary)]">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>

                                            <div>
                                                <p className="font-medium text-[var(--foreground)]">
                                                    {user.name}
                                                </p>

                                                <p className="mt-1 text-xs text-[var(--muted)]">
                                                    {user.email}
                                                </p>
                                            </div>

                                        </div>

                                    </td>

                                    {/* Phone */}
                                    <td className="px-5 py-5 text-[var(--foreground)]">
                                        {user.phone}
                                    </td>

                                    {/* City */}
                                    <td className="px-5 py-5 text-[var(--foreground)]">
                                        {user.city}
                                    </td>

                                    {/* Role */}
                                    <td className="px-5 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "admin"
                                                    ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                                                    : "bg-gray-500/10 text-[var(--muted)]"
                                                }`}
                                        >
                                            {user.role}
                                        </span>

                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${user.status === "active"
                                                    ? "bg-green-500/10 text-green-600"
                                                    : "bg-red-500/10 text-red-600"
                                                }`}
                                        >
                                            {user.status}
                                        </span>

                                    </td>

                                    {/* Joined */}
                                    <td className="px-5 py-5 text-[var(--muted)]">
                                        {user.joinedAt}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-5">

                                        <div className="flex items-center gap-2">

                                            <button
                                                title="View user"
                                                className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                            >
                                                <Eye size={17} />
                                            </button>

                                            <button
                                                title="Delete user"
                                                onClick={() => deleteUser(user.id)}
                                                className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)] transition hover:bg-red-500/10 hover:text-red-500"
                                            >
                                                <Trash2 size={17} />
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

                {/* Mobile */}
                <div className="divide-y divide-[var(--border)] md:hidden">

                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="p-5"
                        >

                            {/* Header */}
                            <div className="flex items-center justify-between">

                                <span className="font-semibold text-[var(--primary)]">
                                    {user.id}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${user.status === "active"
                                            ? "bg-green-500/10 text-green-600"
                                            : "bg-red-500/10 text-red-600"
                                        }`}
                                >
                                    {user.status}
                                </span>

                            </div>

                            {/* User */}
                            <div className="mt-5 flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/15 font-semibold text-[var(--primary)]">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <p className="font-semibold text-[var(--foreground)]">
                                        {user.name}
                                    </p>

                                    <p className="text-sm text-[var(--muted)]">
                                        {user.email}
                                    </p>
                                </div>

                            </div>

                            {/* Details */}
                            <div className="mt-5 space-y-2 text-sm">

                                <div className="flex justify-between gap-4">
                                    <span className="text-[var(--muted)]">
                                        Phone
                                    </span>

                                    <span className="text-[var(--foreground)]">
                                        {user.phone}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-[var(--muted)]">
                                        City
                                    </span>

                                    <span className="text-[var(--foreground)]">
                                        {user.city}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-[var(--muted)]">
                                        Role
                                    </span>

                                    <span className="font-medium text-[var(--primary)]">
                                        {user.role}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-[var(--muted)]">
                                        Joined
                                    </span>

                                    <span className="text-[var(--foreground)]">
                                        {user.joinedAt}
                                    </span>
                                </div>

                            </div>

                            {/* Actions */}
                            <div className="mt-5 flex gap-2">

                                <button
                                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--border)] py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--background)]"
                                >
                                    <Eye size={16} />
                                    View
                                </button>

                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className="rounded-md border border-[var(--border)] px-3 text-[var(--muted)] transition hover:bg-red-500/10 hover:text-red-500"
                                >
                                    <Trash2 size={17} />
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">

                    <Users
                        size={40}
                        className="mb-4 text-[var(--muted)]"
                    />

                    <h2 className="text-lg font-semibold text-[var(--foreground)]">
                        No users found
                    </h2>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        There are no users matching your search.
                    </p>

                </div>
            )}

        </main>
    );
}