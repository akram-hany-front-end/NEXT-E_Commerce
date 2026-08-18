"use client";

import Link from "next/link";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Phone,
    User,
} from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";

export default function RegisterPage() {
    const { language } = useLanguage();
    const isArabic = language === "ar";

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 py-10">

            <div className="w-full max-w-lg">

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
                            ? "إنشاء حساب"
                            : "Create Account"}
                    </h1>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        {isArabic
                            ? "أنشئ حسابك وابدأ التسوق من أركان"
                            : "Create your account and start shopping with ARKAN"}
                    </p>

                </div>

                {/* Card */}

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm md:p-8">

<form className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Name */}

                        <div>

                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                            >
                                {isArabic
                                    ? "الاسم بالكامل"
                                    : "Full Name"}
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                />

                                <input
                                    id="name"
                                    type="text"
                                    placeholder={
                                        isArabic
                                            ? "أدخل اسمك"
                                            : "Enter your name"
                                    }
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-11 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                />

                            </div>

                        </div>

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
                                    placeholder="example@email.com"
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-11 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                />

                            </div>

                        </div>

                        {/* Phone */}

                        <div>

                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                            >
                                {isArabic
                                    ? "رقم الهاتف"
                                    : "Phone Number"}
                            </label>

                            <div className="relative">

                                <Phone
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                />

                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="01xxxxxxxxx"
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-11 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div>

                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                            >
                                {isArabic
                                    ? "كلمة المرور"
                                    : "Password"}
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={
                                        isArabic
                                            ? "أنشئ كلمة مرور"
                                            : "Create a password"
                                    }
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-12 ps-11 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
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

                        {/* Confirm Password */}

                        <div>

                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                            >
                                {isArabic
                                    ? "تأكيد كلمة المرور"
                                    : "Confirm Password"}
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder={
                                        isArabic
                                            ? "أعد كتابة كلمة المرور"
                                            : "Repeat your password"
                                    }
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-12 ps-11 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>


{/* City */}

<div>
  <label
    htmlFor="city"
    className="mb-2 block text-sm font-medium text-[var(--foreground)]"
  >
    {isArabic ? "المدينة / المنطقة" : "City / Area"}
  </label>

  <input
    id="city"
    type="text"
    placeholder={
      isArabic
        ? "مثال: المنصورة"
        : "Example: Mansoura"
    }
    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
  />
</div>
{/* Governorate */}

<div>
  <label
    htmlFor="governorate"
    className="mb-2 block text-sm font-medium text-[var(--foreground)]"
  >
    {isArabic ? "المحافظة" : "Governorate"}
  </label>

  <select
    id="governorate"
    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
  >
    <option value="">
      {isArabic
        ? "اختر المحافظة"
        : "Select governorate"}
    </option>

    <option value="cairo">
      {isArabic ? "القاهرة" : "Cairo"}
    </option>

    <option value="giza">
      {isArabic ? "الجيزة" : "Giza"}
    </option>

    <option value="alexandria">
      {isArabic ? "الإسكندرية" : "Alexandria"}
    </option>

    <option value="dakahlia">
      {isArabic ? "الدقهلية" : "Dakahlia"}
    </option>

    <option value="sharqia">
      {isArabic ? "الشرقية" : "Sharqia"}
    </option>

    <option value="gharbia">
      {isArabic ? "الغربية" : "Gharbia"}
    </option>

    <option value="monufia">
      {isArabic ? "المنوفية" : "Monufia"}
    </option>

    <option value="qalyubia">
      {isArabic ? "القليوبية" : "Qalyubia"}
    </option>

  </select>
</div>

{/* Full Address */}

<div className="md:col-span-2">
  <label
    htmlFor="address"
    className="mb-2 block text-sm font-medium text-[var(--foreground)]"
  >
    {isArabic
      ? "العنوان بالتفصيل"
      : "Full Address"}
  </label>

  <textarea
    id="address"
    rows={3}
    placeholder={
      isArabic
        ? "اسم الشارع، رقم المبنى، الدور، الشقة..."
        : "Street, building number, floor, apartment..."
    }
    className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
  />
</div>
                        {/* Terms */}

                        <label className="flex cursor-pointer items-start gap-2 text-sm text-[var(--muted)]">

                            <input
                                type="checkbox"
                                className="mt-1 accent-[var(--primary)]"
                            />

                            <span>
                                {isArabic
                                    ? "أوافق على شروط وأحكام أركان."
                                    : "I agree to ARKAN's terms and conditions."}
                            </span>

                        </label>

                        {/* Button */}

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[var(--primary)] px-6 py-3.5 font-medium text-white transition hover:opacity-90"
                        >
                            {isArabic
                                ? "إنشاء الحساب"
                                : "Create Account"}
                        </button>

                    </form>

                    {/* Login */}

                    <p className="mt-6 text-center text-sm text-[var(--muted)]">

                        {isArabic
                            ? "لديك حساب بالفعل؟"
                            : "Already have an account?"}

                        {" "}

                        <Link
                            href="/login"
                            className="font-medium text-[var(--primary)] hover:underline"
                        >
                            {isArabic
                                ? "تسجيل الدخول"
                                : "Sign In"}
                        </Link>

                    </p>

                </div>

            </div>

        </main>
    );
}