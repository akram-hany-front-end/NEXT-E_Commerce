"use client";

import { useEffect, useState } from "react";
import {
    Mail,
    Search,
    MoreVertical,
    Trash2,
    Check,
    Reply,
    X,
} from "lucide-react";

type Message = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: "UNREAD" | "READ" | "REPLIED";
    reply?: string;
    repliedAt?: string;
};

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [search, setSearch] = useState("");

    const [selectedMessage, setSelectedMessage] =
        useState<Message | null>(null);

    const [reply, setReply] = useState("");

    const [loading, setLoading] = useState(true);
    const [sendingReply, setSendingReply] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // =========================
    // GET MESSAGES
    // =========================

    const fetchMessages = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch("/api/messages");

            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.message || "Failed to fetch messages"
                );
                return;
            }

            const formattedMessages: Message[] =
                data.messages.map(
                    (message: {
                        _id: string;
                        name: string;
                        email: string;
                        subject: string;
                        message: string;
                        status: "UNREAD" | "READ" | "REPLIED";
                        reply?: string;
                        repliedAt?: string;
                        createdAt: string;
                    }) => ({
                        id: message._id,
                        name: message.name,
                        email: message.email,
                        subject: message.subject,
                        message: message.message,
                        status: message.status,
                        reply: message.reply,
                        repliedAt: message.repliedAt,
                        date: new Date(
                            message.createdAt
                        ).toLocaleString(),
                    })
                );

            setMessages(formattedMessages);
        } catch (error) {
            console.error("Get messages error:", error);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const save = async ()=>{
            await         fetchMessages();

        }
        save()
    }, []);

    // =========================
    // SEARCH
    // =========================

    const filteredMessages = messages.filter((message) => {
        const value = search.toLowerCase().trim();

        return (
            message.name
                .toLowerCase()
                .includes(value) ||
            message.email
                .toLowerCase()
                .includes(value) ||
            message.subject
                .toLowerCase()
                .includes(value) ||
            message.message
                .toLowerCase()
                .includes(value)
        );
    });

    // =========================
    // MARK AS READ
    // =========================

    const markAsRead = async (id: string) => {
        try {
            const res = await fetch(
                `/api/messages/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "READ",
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.message ||
                        "Failed to mark message as read"
                );
                return;
            }

            setMessages((prev) =>
                prev.map((message) =>
                    message.id === id
                        ? {
                              ...message,
                              status: "READ",
                          }
                        : message
                )
            );
        } catch (error) {
            console.error(
                "Mark as read error:",
                error
            );

            setError("Something went wrong");
        }
    };

    // =========================
    // OPEN REPLY
    // =========================

    const openReply = async (message: Message) => {
        setSelectedMessage(message);
        setReply("");
        setError("");

        if (message.status === "UNREAD") {
            await markAsRead(message.id);
        }
    };

    // =========================
    // CLOSE REPLY
    // =========================

    const closeReply = () => {
        setSelectedMessage(null);
        setReply("");
        setError("");
    };

    // =========================
    // SEND REPLY
    // =========================

    const handleReply = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!reply.trim() || !selectedMessage) {
            return;
        }

        try {
            setSendingReply(true);
            setError("");

            const res = await fetch(
                `/api/messages/${selectedMessage.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        reply: reply.trim(),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.message ||
                        "Failed to send reply"
                );
                return;
            }

            // Update message locally
            setMessages((prev) =>
                prev.map((message) =>
                    message.id === selectedMessage.id
                        ? {
                              ...message,
                              reply: reply.trim(),
                              status: "REPLIED",
                              repliedAt:
                                  new Date().toISOString(),
                          }
                        : message
                )
            );

            setSuccess("Reply sent successfully.");

            closeReply();

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (error) {
            console.error(
                "Reply message error:",
                error
            );

            setError("Something went wrong");
        } finally {
            setSendingReply(false);
        }
    };

    // =========================
    // DELETE MESSAGE
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

            setMessages((prev) =>
                prev.filter(
                    (message) => message.id !== id
                )
            );

            setSuccess(
                "Message deleted successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (error) {
            console.error(
                "Delete message error:",
                error
            );

            setError("Something went wrong");
        }
    };

    return (
        <main className="min-h-screen bg-(--background) p-6 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-(--foreground)">
                        Messages
                    </h1>

                    <p className="mt-2 text-sm text-(--muted)">
                        Manage customer messages and inquiries.
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">

                    <Search
                        size={18}
                        className="absolute start-3 top-1/2 -translate-y-1/2 text-(--muted)"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search messages..."
                        className="w-full rounded-lg border border-(--border) bg-(--surface) py-3 pe-4 ps-10 text-sm text-(--foreground) outline-none placeholder:text-(--muted) focus:border-(--primary)"
                    />

                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
                    {success}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-(--border) bg-(--surface)">
                    <p className="text-sm text-(--muted)">
                        Loading messages...
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-(--border) bg-(--surface)">

                    {/* Empty */}
                    {filteredMessages.length === 0 ? (

                        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

                            <Mail
                                size={40}
                                className="mb-4 text-(--muted)"
                            />

                            <h2 className="text-lg font-semibold text-(--foreground)">
                                No messages found
                            </h2>

                            <p className="mt-2 text-sm text-(--muted)">
                                There are no messages matching your search.
                            </p>

                        </div>

                    ) : (

                        <div className="divide-y divide-(--border)">

                            {filteredMessages.map(
                                (message) => (

                                    <div
                                        key={message.id}
                                        className={`group flex flex-col gap-4 p-5 transition hover:bg-(--background) md:flex-row md:items-center ${
                                            message.status ===
                                            "UNREAD"
                                                ? "bg-(--background)"
                                                : ""
                                        }`}
                                    >

                                        {/* Icon */}
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--primary)/15 text-(--primary)">
                                            <Mail size={20} />
                                        </div>

                                        {/* Content */}
                                        <div className="min-w-0 flex-1">

                                            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">

                                                <div className="flex items-center gap-2">

                                                    <h3
                                                        className={`text-sm text-(--foreground) ${
                                                            message.status ===
                                                            "UNREAD"
                                                                ? "font-bold"
                                                                : "font-medium"
                                                        }`}
                                                    >
                                                        {
                                                            message.name
                                                        }
                                                    </h3>

                                                    {message.status ===
                                                        "UNREAD" && (
                                                        <span className="h-2 w-2 rounded-full bg-(--primary)" />
                                                    )}

                                                </div>

                                                <span className="text-xs text-(--muted)">
                                                    {
                                                        message.date
                                                    }
                                                </span>

                                            </div>

                                            <p className="mt-1 text-xs text-(--muted)">
                                                {
                                                    message.email
                                                }
                                            </p>

                                            <div className="mt-3 flex items-center gap-2">

                                                <h4 className="text-sm font-semibold text-(--foreground)">
                                                    {
                                                        message.subject
                                                    }
                                                </h4>

                                                {message.status ===
                                                    "REPLIED" && (
                                                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                                                        Replied
                                                    </span>
                                                )}

                                            </div>

                                            <p className="mt-1 line-clamp-1 text-sm text-(--muted)">
                                                {
                                                    message.message
                                                }
                                            </p>

                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">

                                            {message.status ===
                                                "UNREAD" && (
                                                <button
                                                    onClick={() =>
                                                        markAsRead(
                                                            message.id
                                                        )
                                                    }
                                                    title="Mark as read"
                                                    className="rounded-md border border-(--border) p-2 text-(--muted) transition hover:bg-(--background) hover:text-(--foreground)"
                                                >
                                                    <Check
                                                        size={
                                                            17
                                                        }
                                                    />
                                                </button>
                                            )}

                                            <button
                                                onClick={() =>
                                                    openReply(
                                                        message
                                                    )
                                                }
                                                title="Reply"
                                                className="rounded-md border border-(--border) p-2 text-(--muted) transition hover:bg-(--primary)/10 hover:text-(--primary)"
                                            >
                                                <Reply
                                                    size={
                                                        17
                                                    }
                                                />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteMessage(
                                                        message.id
                                                    )
                                                }
                                                title="Delete"
                                                className="rounded-md border border-(--border) p-2 text-(--muted) transition hover:bg-red-500/10 hover:text-red-500"
                                            >
                                                <Trash2
                                                    size={
                                                        17
                                                    }
                                                />
                                            </button>

                                            <button
                                                title="More"
                                                className="rounded-md border border-(--border) p-2 text-(--muted) transition hover:bg-(--background) hover:text-(--foreground)"
                                            >
                                                <MoreVertical
                                                    size={
                                                        17
                                                    }
                                                />
                                            </button>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>
            )}

            {/* Reply Modal */}
            {selectedMessage && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-2xl rounded-2xl border border-(--border) bg-(--surface) shadow-xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-(--border) p-5">

                            <div>
                                <h2 className="text-lg font-bold text-(--foreground)">
                                    Reply to Customer
                                </h2>

                                <p className="mt-1 text-sm text-(--muted)">
                                    Send a reply to{" "}
                                    {
                                        selectedMessage.name
                                    }
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeReply}
                                className="rounded-md p-2 text-(--muted) transition hover:bg-(--background) hover:text-(--foreground)"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* Content */}
                        <div className="space-y-4 p-5">

                            {/* Customer Message */}
                            <div className="rounded-xl border border-(--border) bg-(--background) p-4">

                                <div>
                                    <p className="font-semibold text-(--foreground)">
                                        {
                                            selectedMessage.name
                                        }
                                    </p>

                                    <p className="mt-1 text-xs text-(--muted)">
                                        {
                                            selectedMessage.email
                                        }
                                    </p>
                                </div>

                                <div className="mt-4">

                                    <p className="text-xs font-medium text-(--muted)">
                                        Subject
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-(--foreground)">
                                        {
                                            selectedMessage.subject
                                        }
                                    </p>

                                </div>

                                <div className="mt-4">

                                    <p className="text-xs font-medium text-(--muted)">
                                        Customer Message
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-(--muted)">
                                        {
                                            selectedMessage.message
                                        }
                                    </p>

                                </div>

                                {/* Previous Reply */}
                                {selectedMessage.reply && (
                                    <div className="mt-4 rounded-lg border border-(--primary)/20 bg-(--primary)/5 p-4">

                                        <p className="text-xs font-medium text-(--primary)">
                                            Previous Admin Reply
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-(--foreground)">
                                            {
                                                selectedMessage.reply
                                            }
                                        </p>

                                    </div>
                                )}

                            </div>

                            {/* Reply Form */}
                            <form onSubmit={handleReply}>

                                <label className="mb-2 block text-sm font-medium text-(--foreground)">
                                    Your Reply
                                </label>

                                <textarea
                                    value={reply}
                                    onChange={(e) =>
                                        setReply(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Write your reply..."
                                    rows={6}
                                    className="w-full resize-none rounded-lg border border-(--border) bg-(--background) p-4 text-sm text-(--foreground) outline-none placeholder:text-(--muted) focus:border-(--primary) focus:ring-1 focus:ring-(--primary)"
                                />

                                <div className="mt-4 flex justify-end gap-3">

                                    <button
                                        type="button"
                                        onClick={
                                            closeReply
                                        }
                                        className="rounded-lg border border-(--border) px-5 py-3 text-sm font-medium text-(--foreground) transition hover:bg-(--background)"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={
                                            !reply.trim() ||
                                            sendingReply
                                        }
                                        className="flex items-center gap-2 rounded-lg bg-(--primary) px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Reply
                                            size={17}
                                        />

                                        {sendingReply
                                            ? "Sending..."
                                            : "Send Reply"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}