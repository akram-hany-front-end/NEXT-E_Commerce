"use client";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
} from "lucide-react";
import { useState } from "react";
import { signIn , getSession } from "next-auth/react";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
export default function LoginPage() {

    const { language } = useLanguage();
    const router = useRouter();
    const isArabic = language === "ar";
    const [showPassword, setShowPassword] =
        useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });
            if (result?.error) {
                setError(
                    isArabic
                        ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
                        : "Invalid email or password"
                );
                return;
            }
if (result?.ok) {
    const session = await getSession();
    if (session?.user.role === "ADMIN") {
        router.push("/admin");
    } else {
        router.push("/products");
    }
    router.refresh();
    return;
}
        } catch {
            setError(
                isArabic
                    ? "حدث خطأ أثناء تسجيل الدخول"
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 py-10">

            <div className="w-full max-w-md">

                {/* Logo */}

                <div className="mb-8 text-center">

                    <Link
                        href="/"
                        className="text-3xl font-bold tracking-[0.2em] text-[var(--primary)]"
                    >
                        ARKAN
                    </Link>

                    <h1 className="mt-6 text-2xl font-bold text-[var(--foreground)]">
                        {isArabic
                            ? "مرحبًا بعودتك"
                            : "Welcome Back"}
                    </h1>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        {isArabic
                            ? "سجل دخولك إلى حسابك"
                            : "Sign in to your account"}
                    </p>

                </div>

                {/* Card */}

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm md:p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                            >
                                {isArabic
                                    ? "البريد الإلكتروني"
                                    : "Email Address"}
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="example@email.com"
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-11 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-[var(--foreground)]"
                                >
                                    {isArabic
                                        ? "كلمة المرور"
                                        : "Password"}
                                </label>

                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs text-[var(--primary)] hover:underline"
                                >
                                    {isArabic
                                        ? "نسيت كلمة المرور؟"
                                        : "Forgot password?"}
                                </Link>

                            </div>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder={
                                        isArabic
                                            ? "أدخل كلمة المرور"
                                            : "Enter your password"
                                    }
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-12 ps-11 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Error */}

                        {error && (
                            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        {/* Remember */}

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]">

                            <input
                                type="checkbox"
                                className="accent-[var(--primary)]"
                            />

                            {isArabic
                                ? "تذكرني"
                                : "Remember me"}

                        </label>

                        {/* Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[var(--primary)] px-6 py-3.5 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? isArabic
                                    ? "جاري تسجيل الدخول..."
                                    : "Signing in..."
                                : isArabic
                                    ? "تسجيل الدخول"
                                    : "Sign In"}
                        </button>

                    </form>

                    {/* Register */}

                    <p className="mt-6 text-center text-sm text-[var(--muted)]">

                        {isArabic
                            ? "ليس لديك حساب؟"
                            : "Don't have an account?"}

                        {" "}

                        <Link
                            href="/register"
                            className="font-medium text-[var(--primary)] hover:underline"
                        >
                            {isArabic
                                ? "إنشاء حساب"
                                : "Create Account"}
                        </Link>

                    </p>

                </div>

            </div>

        </main>
    );
}