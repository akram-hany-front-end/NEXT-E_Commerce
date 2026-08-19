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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        governorate: "",
        city: "",
        details: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
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
        setSuccess("");
console.log(formData ,"before")

if (!formData.name){
    alert("name needed")
    return;
}
if (!formData.email){
    alert("email needed")
    return;
}
if (!formData.city){
    alert("city needed")
    return;
}
if (!formData.governorate){
    alert("governorate needed")
    return;
}
if (!formData.details){
    alert("details needed")
    return;
}
if (!formData.password){
    alert("password needed")
    return;
}
if (!formData.confirmPassword){
    alert("confirmPassword needed")
    return;
}
console.log(formData, "after")

        if (formData.password !== formData.confirmPassword) {
            setError(
                isArabic
                    ? "كلمتا المرور غير متطابقتين"
                    : "Passwords do not match"
            );

            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,

                        address: {
                            governorate: formData.governorate,
                            city: formData.city,
                            details: formData.details,
                        },

                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                    }),
                }
            );
            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error(data.message);
            }

            setSuccess(
                isArabic
                    ? "تم إنشاء الحساب بنجاح"
                    : "Account created successfully"
            );

            setFormData({
                name: "",
                email: "",
                phone: "",
                governorate: "",
                city: "",
                details: "",
                password: "",                       
                confirmPassword: "",
            });

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

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

                    <form
                        onSubmit={handleSubmit}

                        className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                                    value={formData.name}
                                                                        onChange={handleChange}

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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.phone}
                                    onChange={handleChange}
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
                                    value={formData.password}
                                    onChange={handleChange}
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
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
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
                                value={formData.city}
                                onChange={handleChange}
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
                                value={formData.governorate}
                                onChange={handleChange}
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
                                id="details"
                                value={formData.details}
                                onChange={handleChange}
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

                        {error && (
                            <p className="md:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="md:col-span-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500">
                                {success}
                            </p>
                        )}
                        {/* Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 w-full rounded-lg bg-[var(--primary)] px-6 py-3.5 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? isArabic
                                    ? "جاري إنشاء الحساب..."
                                    : "Creating account..."
                                : isArabic
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