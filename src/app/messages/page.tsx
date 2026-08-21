"use client";

import { useEffect, useState } from "react";
import {
    Mail,
    MessageSquare,
    Clock,
    CheckCircle2,
    Send,
    Trash2,
} from "lucide-react";

type Message = {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    reply?: string;
    status: "UNREAD" | "READ" | "REPLIED";
    createdAt: string;
    repliedAt?: string;
};

type SessionUser = {
    id: string;
    name: string;
    email: string;
};

type Session = {
    user?: SessionUser;
};

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // Fetch User Messages
    // =========================

    const fetchMessages = async () => {
        try {
            setLoading(true);
            setError("");

            const sessionRes = await fetch(
                "/api/auth/session"
            );

            if (!sessionRes.ok) {
                throw new Error("Failed to get session");
            }

            const session: Session =
                await sessionRes.json();

            if (!session.user?.id) {
                setError(
                    "User ID not found in session."
                );
                return;
            }

            const res = await fetch(
                `/api/messages?user=${encodeURIComponent(
                    session.user.id
                )}`
            );

            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.message ||
                        "Failed to fetch messages"
                );
                return;
            }

            setMessages(data.messages || []);
        } catch (error) {
            console.error(
                "Get user messages error:",
                error
            );

            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Delete Message
    // =========================

    const deleteMessage = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) return;

        try {
            setError("");

            const res = await fetch(
                `/api/messages/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.message ||
                        "Failed to delete message"
                );
                return;
            }

            // Remove message from UI
            setMessages((prev) =>
                prev.filter(
                    (message) => message._id !== id
                )
            );
        } catch (error) {
            console.error(
                "Delete message error:",
                error
            );

            setError(
                "Something went wrong while deleting the message."
            );
        }
    };

    // =========================
    // Fetch on Mount
    // =========================

    useEffect(() => {
        const save = async () => {
            await fetchMessages();

        }
        save()
    }, []);

    return (
        <main className="min-h-screen bg-(--background) px-6 py-10 md:px-10 lg:px-16">
            <div className="mx-auto max-w-5xl">

                {/* =========================
                    Header
                ========================= */}

                <div className="mb-8">
                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-(--primary)/10 p-3">
                            <Mail
                                size={24}
                                className="text-(--primary)"
                            />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-(--foreground)">
                                My Messages
                            </h1>

                            <p className="mt-1 text-sm text-(--muted)">
                                View your messages and admin replies.
                            </p>
                        </div>

                    </div>
                </div>

                {/* =========================
                    Error
                ========================= */}

                {error && (
                    <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* =========================
                    Loading
                ========================= */}

                {loading && (
                    <div className="rounded-xl border border-(--border) bg-(--surface) p-10 text-center">

                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />

                        <p className="text-sm text-(--muted)">
                            Loading your messages...
                        </p>

                    </div>
                )}

                {/* =========================
                    Empty
                ========================= */}

                {!loading &&
                    !error &&
                    messages.length === 0 && (
                        <div className="rounded-xl border border-(--border) bg-(--surface) px-6 py-16 text-center">

                            <Mail
                                size={42}
                                className="mx-auto mb-4 text-(--muted)"
                            />

                            <h2 className="text-lg font-semibold text-(--foreground)">
                                No messages yet
                            </h2>

                            <p className="mt-2 text-sm text-(--muted)">
                                You haven't sent any messages yet.
                            </p>

                        </div>
                    )}

                {/* =========================
                    Messages
                ========================= */}

                {!loading &&
                    messages.length > 0 && (
                        <div className="space-y-6">

                            {messages.map((message) => (
                                <div
                                    key={message._id}
                                    className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface)"
                                >

                                    {/* =========================
                                        Message Header
                                    ========================= */}

                                    <div className="flex flex-col gap-4 border-b border-(--border) p-5 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary)/10 text-(--primary)">
                                                <MessageSquare
                                                    size={19}
                                                />
                                            </div>

                                            <div>
                                                <h2 className="font-semibold text-(--foreground)">
                                                    {message.subject}
                                                </h2>

                                                <p className="mt-1 text-xs text-(--muted)">
                                                    {new Date(
                                                        message.createdAt
                                                    ).toLocaleString()}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Status + Delete */}

                                        <div className="flex items-center gap-3">

                                            <StatusBadge
                                                status={
                                                    message.status
                                                }
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteMessage(
                                                        message._id
                                                    )
                                                }
                                                title="Delete message"
                                                className="rounded-lg border border-(--border) p-2 text-(--muted) transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                                            >
                                                <Trash2
                                                    size={17}
                                                />
                                            </button>

                                        </div>

                                    </div>

                                    {/* =========================
                                        Customer Message
                                    ========================= */}

                                    <div className="p-5">

                                        <div className="mb-3 flex items-center gap-2">

                                            <Send
                                                size={16}
                                                className="text-(--primary)"
                                            />

                                            <h3 className="text-sm font-semibold text-(--foreground)">
                                                Your Message
                                            </h3>

                                        </div>

                                        <div className="rounded-xl border border-(--border) bg-(--background) p-4">

                                            <p className="whitespace-pre-wrap text-sm leading-7 text-(--muted)">
                                                {message.message}
                                            </p>

                                        </div>

                                    </div>

                                    {/* =========================
                                        Admin Reply
                                    ========================= */}

                                    {message.reply && (
                                        <div className="border-t border-(--border) p-5">

                                            <div className="mb-3 flex items-center gap-2">

                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary)/10">
                                                    <MessageSquare
                                                        size={16}
                                                        className="text-(--primary)"
                                                    />
                                                </div>

                                                <div>

                                                    <h3 className="text-sm font-semibold text-(--foreground)">
                                                        Admin Reply
                                                    </h3>

                                                    {message.repliedAt && (
                                                        <p className="text-xs text-(--muted)">
                                                            {new Date(
                                                                message.repliedAt
                                                            ).toLocaleString()}
                                                        </p>
                                                    )}

                                                </div>

                                            </div>

                                            <div className="rounded-xl border border-(--primary)/20 bg-(--primary)/5 p-4">

                                                <p className="whitespace-pre-wrap text-sm leading-7 text-(--foreground)">
                                                    {message.reply}
                                                </p>

                                            </div>

                                        </div>
                                    )}

                                    {/* =========================
                                        Waiting For Reply
                                    ========================= */}

                                    {!message.reply && (
                                        <div className="border-t border-(--border) px-5 py-4">

                                            <div className="flex items-center gap-2 text-sm text-(--muted)">

                                                <Clock
                                                    size={16}
                                                />

                                                <span>
                                                    Waiting for admin reply...
                                                </span>

                                            </div>

                                        </div>
                                    )}

                                </div>
                            ))}

                        </div>
                    )}

            </div>
        </main>
    );
}

/* =========================
   Status Badge
========================= */

function StatusBadge({
    status,
}: {
    status: Message["status"];
}) {
    if (status === "REPLIED") {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600">
                <CheckCircle2 size={14} />
                Replied
            </span>
        );
    }

    if (status === "READ") {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-600">
                <CheckCircle2 size={14} />
                Read
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-600">
            <Clock size={14} />
            Pending
        </span>
    );
}