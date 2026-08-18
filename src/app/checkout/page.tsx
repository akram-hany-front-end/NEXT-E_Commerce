"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CreditCard,
    MapPin,
    ShoppingBag,
    Truck,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
    const { language } = useLanguage();
    const { cart, cartTotal } = useCart();

    const isArabic = language === "ar";

    return (
        <main className="min-h-screen bg-[var(--background)] px-5 py-10 md:px-8 lg:px-12">

            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-10">

                    <p className="text-sm font-medium tracking-[0.25em] text-[var(--primary)]">
                        ARKAN
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                        {isArabic
                            ? "إتمام الطلب"
                            : "Checkout"}
                    </h1>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        {isArabic
                            ? "أدخل بياناتك لإتمام طلبك"
                            : "Enter your information to complete your order"}
                    </p>

                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* =========================
              Customer Information
          ========================== */}

                    <section className="space-y-6 lg:col-span-2">

                        {/* Customer Info */}

                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                                    <MapPin
                                        size={20}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-bold text-[var(--foreground)]">
                                        {isArabic
                                            ? "بيانات العميل"
                                            : "Customer Information"}
                                    </h2>

                                    <p className="text-sm text-[var(--muted)]">
                                        {isArabic
                                            ? "بيانات التواصل والتوصيل"
                                            : "Contact and delivery information"}
                                    </p>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

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

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder={
                                            isArabic
                                                ? "أدخل اسمك"
                                                : "Enter your name"
                                        }
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                    />
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

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder={
                                            isArabic
                                                ? "example@email.com"
                                                : "example@email.com"
                                        }
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                    />
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

                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder={
                                            isArabic
                                                ? "01xxxxxxxxx"
                                                : "01xxxxxxxxx"
                                        }
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                    />
                                </div>

                                {/* Governorate */}

                                <div>
                                    <label
                                        htmlFor="city"
                                        className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                                    >
                                        {isArabic
                                            ? "المحافظة"
                                            : "Governorate"}
                                    </label>

                                    <select
                                        id="city"
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
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
                                            {isArabic
                                                ? "الإسكندرية"
                                                : "Alexandria"}
                                        </option>

                                        <option value="dakahlia">
                                            {isArabic
                                                ? "الدقهلية"
                                                : "Dakahlia"}
                                        </option>

                                        <option value="sharqia">
                                            {isArabic
                                                ? "الشرقية"
                                                : "Sharqia"}
                                        </option>

                                        <option value="gharbia">
                                            {isArabic
                                                ? "الغربية"
                                                : "Gharbia"}
                                        </option>

                                    </select>
                                </div>

                                {/* Address */}

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
                                        rows={4}
                                        placeholder={
                                            isArabic
                                                ? "أدخل العنوان بالتفصيل..."
                                                : "Enter your full address..."
                                        }
                                        className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                    />

                                </div>

                                {/* Notes */}

                                <div className="md:col-span-2">

                                    <label
                                        htmlFor="notes"
                                        className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                                    >
                                        {isArabic
                                            ? "ملاحظات الطلب"
                                            : "Order Notes"}

                                        <span className="ms-2 text-xs font-normal text-[var(--muted)]">
                                            {isArabic
                                                ? "(اختياري)"
                                                : "(Optional)"}
                                        </span>
                                    </label>

                                    <textarea
                                        id="notes"
                                        rows={3}
                                        placeholder={
                                            isArabic
                                                ? "أي ملاحظات خاصة بالطلب..."
                                                : "Any special notes about your order..."
                                        }
                                        className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* =========================
                Payment Method
            ========================== */}

                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                                    <CreditCard
                                        size={20}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-bold text-[var(--foreground)]">
                                        {isArabic
                                            ? "طريقة الدفع"
                                            : "Payment Method"}
                                    </h2>

                                    <p className="text-sm text-[var(--muted)]">
                                        {isArabic
                                            ? "اختر طريقة الدفع المناسبة لك"
                                            : "Choose your preferred payment method"}
                                    </p>
                                </div>

                            </div>

                            <div className="space-y-3">

                                {/* Stripe */}

                                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-[var(--primary)] bg-[var(--primary)]/5 p-4">

                                    <input
                                        type="radio"
                                        name="payment"
                                        value="stripe"
                                        defaultChecked
                                        className="accent-[var(--primary)]"
                                    />

                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--surface)]">
                                        <CreditCard
                                            size={21}
                                            className="text-[var(--primary)]"
                                        />
                                    </div>

                                    <div className="flex-1">

                                        <p className="font-semibold text-[var(--foreground)]">
                                            {isArabic
                                                ? "الدفع الإلكتروني"
                                                : "Online Payment"}
                                        </p>

                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            {isArabic
                                                ? "الدفع بأمان باستخدام البطاقة"
                                                : "Secure payment using your card"}
                                        </p>

                                    </div>

                                </label>

                                {/* Cash */}

                                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-[var(--border)] p-4 transition hover:border-[var(--primary)]">

                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cash"
                                        className="accent-[var(--primary)]"
                                    />

                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--background)]">
                                        <Truck
                                            size={21}
                                            className="text-[var(--primary)]"
                                        />
                                    </div>

                                    <div className="flex-1">

                                        <p className="font-semibold text-[var(--foreground)]">
                                            {isArabic
                                                ? "الدفع عند الاستلام"
                                                : "Cash on Delivery"}
                                        </p>

                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            {isArabic
                                                ? "ادفع عند وصول الطلب"
                                                : "Pay when your order arrives"}
                                        </p>

                                    </div>

                                </label>

                            </div>

                        </div>

                    </section>

                    {/* =========================
              Order Summary
          ========================== */}

                    <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

                        <div className="flex items-center gap-3">

                            <ShoppingBag
                                size={20}
                                className="text-[var(--primary)]"
                            />

                            <h2 className="text-xl font-bold text-[var(--foreground)]">
                                {isArabic
                                    ? "ملخص الطلب"
                                    : "Order Summary"}
                            </h2>

                        </div>

                        {/* Products */}

                        <div className="mt-6 max-h-[380px] space-y-4 overflow-y-auto">

                            {cart.map((item) => {

                                const name = isArabic
                                    ? item.name.ar
                                    : item.name.en;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex gap-3"
                                    >

                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--background)]">

                                            <Image
                                                src={item.image}
                                                alt={name}
                                                fill
                                                className="object-cover"
                                            />

                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <p className="truncate text-sm font-medium text-[var(--foreground)]">
                                                {name}
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--muted)]">
                                                {isArabic
                                                    ? `الكمية: ${item.quantity}`
                                                    : `Qty: ${item.quantity}`}
                                            </p>

                                        </div>

                                        <p className="text-sm font-semibold text-[var(--foreground)]">
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString()}{" "}
                                            EGP
                                        </p>

                                    </div>
                                );
                            })}

                        </div>

                        {/* Totals */}

                        <div className="mt-6 space-y-4 border-t border-[var(--border)] pt-5">

                            <div className="flex justify-between text-sm">

                                <span className="text-[var(--muted)]">
                                    {isArabic
                                        ? "المنتجات"
                                        : "Subtotal"}
                                </span>

                                <span className="text-[var(--foreground)]">
                                    {cartTotal.toLocaleString()} EGP
                                </span>

                            </div>

                            <div className="flex justify-between text-sm">

                                <span className="text-[var(--muted)]">
                                    {isArabic
                                        ? "الشحن"
                                        : "Shipping"}
                                </span>

                                <span className="font-medium text-green-600">
                                    {isArabic
                                        ? "مجاني"
                                        : "Free"}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">

                                <span className="font-bold text-[var(--foreground)]">
                                    {isArabic
                                        ? "الإجمالي"
                                        : "Total"}
                                </span>

                                <span className="text-2xl font-bold text-[var(--primary)]">
                                    {cartTotal.toLocaleString()} EGP
                                </span>

                            </div>

                        </div>

                        {/* Checkout Button */}

                        <button
                            type="button"
                            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-4 font-semibold text-white transition hover:opacity-90"
                        >
                            {isArabic
                                ? "تأكيد الطلب والدفع"
                                : "Confirm & Pay"}

                            {isArabic ? (
                                <ArrowLeft size={18} />
                            ) : (
                                <ArrowRight size={18} />
                            )}
                        </button>

                        <Link
                            href="/cart"
                            className="mt-3 flex w-full items-center justify-center rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]"
                        >
                            {isArabic
                                ? "العودة للسلة"
                                : "Back to Cart"}
                        </Link>

                        <p className="mt-5 text-center text-xs leading-5 text-[var(--muted)]">
                            {isArabic
                                ? "بإتمام الطلب أنت توافق على شروط وأحكام أركان."
                                : "By placing your order, you agree to ARKAN's terms and conditions."}
                        </p>

                    </aside>

                </div>

            </div>

        </main>
    );
}