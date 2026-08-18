"use client";

import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    Lock,
    Save,
    Camera,
    Eye,
    EyeOff,
} from "lucide-react";

export default function ProfilePage() {
    const [name, setName] = useState("Arkan Admin");
    const [email, setEmail] = useState("admin@arkan.com");
    const [phone, setPhone] = useState("01000000000");
    const [city, setCity] = useState("Mansoura");

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [message, setMessage] = useState("");

    const handleProfileSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setMessage("Profile updated successfully.");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const handlePasswordSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setMessage("Please fill all password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setMessage("Password changed successfully.");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-8">

            {/* =========================
          Header
      ========================= */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                    Profile
                </h1>

                <p className="mt-2 text-sm text-[var(--muted)]">
                    Manage your account information and security.
                </p>

            </div>

            {/* =========================
          Success / Error Message
      ========================= */}

            {message && (
                <div className="mb-6 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-3 text-sm text-[var(--foreground)]">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* =========================
            Profile Card
        ========================= */}

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

                    <div className="flex flex-col items-center text-center">

                        {/* Avatar */}

                        <div className="relative">

                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--primary)]/15 text-4xl font-bold text-[var(--primary)]">
                                A
                            </div>

                            <button
                                type="button"
                                className="absolute bottom-1 end-1 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-sm transition hover:text-[var(--primary)]"
                            >
                                <Camera size={17} />
                            </button>

                        </div>

                        {/* Name */}

                        <h2 className="mt-5 text-xl font-bold text-[var(--foreground)]">
                            {name}
                        </h2>

                        <p className="mt-1 text-sm text-[var(--muted)]">
                            {email}
                        </p>

                        {/* Role */}

                        <div className="mt-4 flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]">
                            <ShieldCheck size={17} />
                            Administrator
                        </div>

                    </div>

                    {/* Account Info */}

                    <div className="mt-8 border-t border-[var(--border)] pt-6">

                        <h3 className="mb-4 font-semibold text-[var(--foreground)]">
                            Account Information
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">

                                <div className="rounded-lg bg-[var(--background)] p-2">
                                    <User
                                        size={17}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-[var(--muted)]">
                                        Role
                                    </p>

                                    <p className="text-sm font-medium text-[var(--foreground)]">
                                        Admin
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="rounded-lg bg-[var(--background)] p-2">
                                    <Mail
                                        size={17}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-[var(--muted)]">
                                        Email
                                    </p>

                                    <p className="truncate text-sm font-medium text-[var(--foreground)]">
                                        {email}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="rounded-lg bg-[var(--background)] p-2">
                                    <Phone
                                        size={17}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-[var(--muted)]">
                                        Phone
                                    </p>

                                    <p className="text-sm font-medium text-[var(--foreground)]">
                                        {phone}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="rounded-lg bg-[var(--background)] p-2">
                                    <MapPin
                                        size={17}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-[var(--muted)]">
                                        City
                                    </p>

                                    <p className="text-sm font-medium text-[var(--foreground)]">
                                        {city}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================
            Forms
        ========================= */}

                <div className="space-y-6 xl:col-span-2">

                    {/* =========================
              Personal Information
          ========================= */}

                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

                        <div className="mb-6">

                            <h2 className="text-xl font-bold text-[var(--foreground)]">
                                Personal Information
                            </h2>

                            <p className="mt-1 text-sm text-[var(--muted)]">
                                Update your personal account information.
                            </p>

                        </div>

                        <form
                            onSubmit={handleProfileSubmit}
                            className="space-y-5"
                        >

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* Name */}

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={18}
                                            className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                        />

                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                                        />

                                    </div>

                                </div>

                                {/* Email */}

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        Email
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                        />

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                                        />

                                    </div>

                                </div>

                                {/* Phone */}

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        Phone
                                    </label>

                                    <div className="relative">

                                        <Phone
                                            size={18}
                                            className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                        />

                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                                        />

                                    </div>

                                </div>

                                {/* City */}

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        City
                                    </label>

                                    <div className="relative">

                                        <MapPin
                                            size={18}
                                            className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                        />

                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="flex justify-end pt-2">

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    <Save size={17} />
                                    Save Changes
                                </button>

                            </div>

                        </form>

                    </section>

                    {/* =========================
              Change Password
          ========================= */}

                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

                        <div className="mb-6">

                            <div className="flex items-center gap-3">

                                <div className="rounded-lg bg-[var(--primary)]/10 p-2">
                                    <Lock
                                        size={20}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-[var(--foreground)]">
                                        Change Password
                                    </h2>

                                    <p className="mt-1 text-sm text-[var(--muted)]">
                                        Keep your account secure with a strong
                                        password.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-5"
                        >

                            {/* Current Password */}

                            <div className="space-y-2">

                                <label className="text-sm font-medium text-[var(--foreground)]">
                                    Current Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showCurrentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter current password"
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-12 ps-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrentPassword(
                                                !showCurrentPassword
                                            )
                                        }
                                        className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* New Password */}

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        New Password
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter new password"
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-12 ps-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                            className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                        >
                                            {showNewPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>

                                    </div>

                                </div>

                                {/* Confirm Password */}

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        Confirm Password
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Confirm new password"
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-12 ps-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>

                                    </div>

                                </div>

                            </div>

                            <div className="flex justify-end pt-2">

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    <Lock size={17} />
                                    Change Password
                                </button>

                            </div>

                        </form>

                    </section>

                </div>

            </div>

        </main>
    );
}