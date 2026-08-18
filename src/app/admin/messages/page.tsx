"use client";

import { useState } from "react";
import {
    Mail,
    Search,
    MoreVertical,
    Trash2,
    Check,
} from "lucide-react";

type Message = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    unread: boolean;
};

const messagesData: Message[] = [
    {
        id: 1,
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        subject: "Product inquiry",
        message:
            "I would like to know more details about the living room set.",
        date: "Today, 10:30 AM",
        unread: true,
    },
    {
        id: 2,
        name: "Sara Ali",
        email: "sara@example.com",
        subject: "Order question",
        message:
            "Can you tell me when my order will be delivered?",
        date: "Today, 09:15 AM",
        unread: true,
    },
    {
        id: 3,
        name: "Omar Hassan",
        email: "omar@example.com",
        subject: "Return request",
        message:
            "I would like to ask about the return policy.",
        date: "Yesterday",
        unread: false,
    },
];

export default function MessagesPage() {
    const [messages, setMessages] =
        useState<Message[]>(messagesData);

    const [search, setSearch] = useState("");

    const filteredMessages = messages.filter((message) => {
        const value = search.toLowerCase();

        return (
            message.name.toLowerCase().includes(value) ||
            message.email.toLowerCase().includes(value) ||
            message.subject.toLowerCase().includes(value)
        );
    });

    const markAsRead = (id: number) => {
        setMessages((prev) =>
            prev.map((message) =>
                message.id === id
                    ? { ...message, unread: false }
                    : message
            )
        );
    };

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">
                        Messages
                    </h1>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Manage customer messages and inquiries.
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search
                        size={18}
                        className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search messages..."
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                    />
                </div>
            </div>

            {/* Messages */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">

                {filteredMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

                        <Mail
                            size={40}
                            className="mb-4 text-[var(--muted)]"
                        />

                        <h2 className="text-lg font-semibold text-[var(--foreground)]">
                            No messages found
                        </h2>

                        <p className="mt-2 text-sm text-[var(--muted)]">
                            There are no messages matching your search.
                        </p>

                    </div>
                ) : (
                    <div className="divide-y divide-[var(--border)]">

                        {filteredMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`group flex flex-col gap-4 p-5 transition hover:bg-[var(--background)] md:flex-row md:items-center ${message.unread
                                        ? "bg-[var(--background)]"
                                        : ""
                                    }`}
                            >

                                {/* Icon */}
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
                                    <Mail size={20} />
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">

                                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">

                                        <div className="flex items-center gap-2">

                                            <h3
                                                className={`text-sm text-[var(--foreground)] ${message.unread
                                                        ? "font-bold"
                                                        : "font-medium"
                                                    }`}
                                            >
                                                {message.name}
                                            </h3>

                                            {message.unread && (
                                                <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                                            )}

                                        </div>

                                        <span className="text-xs text-[var(--muted)]">
                                            {message.date}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-xs text-[var(--muted)]">
                                        {message.email}
                                    </p>

                                    <h4 className="mt-3 text-sm font-semibold text-[var(--foreground)]">
                                        {message.subject}
                                    </h4>

                                    <p className="mt-1 line-clamp-1 text-sm text-[var(--muted)]">
                                        {message.message}
                                    </p>

                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">

                                    {message.unread && (
                                        <button
                                            onClick={() => markAsRead(message.id)}
                                            title="Mark as read"
                                            className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                        >
                                            <Check size={17} />
                                        </button>
                                    )}

                                    <button
                                        title="Delete"
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

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}