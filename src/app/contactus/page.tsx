"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
} from "lucide-react";

export default function ContactPage() {
    const { language } = useLanguage();

    const isArabic = language === "ar";

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [sent, setSent] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSent(true);

        setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

        setTimeout(() => {
            setSent(false);
        }, 4000);
    };

    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-12 md:px-10 lg:px-16">

            {/* =========================
          Header
      ========================= */}

            <section className="mx-auto max-w-6xl">

                <div className="mx-auto max-w-2xl text-center">

                    <p className="mb-3 text-sm font-medium tracking-[0.3em] text-[var(--primary)]">
                        ARKAN
                    </p>

                    <h1 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">
                        {isArabic ? "تواصل معنا" : "Contact Us"}
                    </h1>

                    <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                        {isArabic
                            ? "يسعدنا تواصلك معنا. إذا كان لديك أي استفسار أو تحتاج إلى مساعدة، أرسل لنا رسالة وسنكون سعداء بمساعدتك."
                            : "We would love to hear from you. If you have any questions or need assistance, send us a message and we will be happy to help."}
                    </p>

                </div>

                {/* =========================
            Content
        ========================= */}

                <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* =========================
              Contact Information
          ========================= */}

                    <div className="space-y-5">

                        <ContactInfo
                            icon={Mail}
                            title={isArabic ? "البريد الإلكتروني" : "Email"}
                            value="support@arkan.com"
                        />

                        <ContactInfo
                            icon={Phone}
                            title={isArabic ? "الهاتف" : "Phone"}
                            value="+20 100 000 0000"
                        />

                        <ContactInfo
                            icon={MapPin}
                            title={isArabic ? "العنوان" : "Address"}
                            value={
                                isArabic
                                    ? "المنصورة، مصر"
                                    : "Mansoura, Egypt"
                            }
                        />

                        <ContactInfo
                            icon={MessageSquare}
                            title={isArabic ? "خدمة العملاء" : "Customer Support"}
                            value={
                                isArabic
                                    ? "متاح يوميًا من 9 صباحًا حتى 9 مساءً"
                                    : "Available daily from 9 AM to 9 PM"
                            }
                        />

                    </div>

                    {/* =========================
              Contact Form
          ========================= */}

                    <div className="lg:col-span-2">

                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm md:p-8">

                            <div className="mb-7">

                                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                                    {isArabic
                                        ? "أرسل لنا رسالة"
                                        : "Send us a message"}
                                </h2>

                                <p className="mt-2 text-sm text-[var(--muted)]">
                                    {isArabic
                                        ? "املأ البيانات التالية وسنتواصل معك في أقرب وقت."
                                        : "Fill in the information below and we will get back to you as soon as possible."}
                                </p>

                            </div>

                            {/* Success */}

                            {sent && (
                                <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
                                    {isArabic
                                        ? "تم إرسال رسالتك بنجاح. شكرًا لتواصلك معنا."
                                        : "Your message has been sent successfully. Thank you for contacting us."}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Name + Email */}

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    <div className="space-y-2">

                                        <label
                                            htmlFor="name"
                                            className="text-sm font-medium text-[var(--foreground)]"
                                        >
                                            {isArabic ? "الاسم" : "Name"}
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder={
                                                isArabic
                                                    ? "اكتب اسمك"
                                                    : "Enter your name"
                                            }
                                            required
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                        />

                                    </div>

                                    <div className="space-y-2">

                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium text-[var(--foreground)]"
                                        >
                                            {isArabic
                                                ? "البريد الإلكتروني"
                                                : "Email"}
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder={
                                                isArabic
                                                    ? "example@email.com"
                                                    : "example@email.com"
                                            }
                                            required
                                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                        />

                                    </div>

                                </div>

                                {/* Subject */}

                                <div className="space-y-2">

                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium text-[var(--foreground)]"
                                    >
                                        {isArabic ? "الموضوع" : "Subject"}
                                    </label>

                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder={
                                            isArabic
                                                ? "موضوع الرسالة"
                                                : "Message subject"
                                        }
                                        required
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                    />

                                </div>

                                {/* Message */}

                                <div className="space-y-2">

                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium text-[var(--foreground)]"
                                    >
                                        {isArabic ? "الرسالة" : "Message"}
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder={
                                            isArabic
                                                ? "اكتب رسالتك هنا..."
                                                : "Write your message here..."
                                        }
                                        required
                                        rows={6}
                                        className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                    />

                                </div>

                                {/* Submit */}

                                <div className="flex justify-end pt-2">

                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-7 py-3 font-medium text-white transition hover:opacity-90 sm:w-auto"
                                    >
                                        <Send size={17} />

                                        {isArabic
                                            ? "إرسال الرسالة"
                                            : "Send Message"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

/* =========================
   Contact Info Component
========================= */

function ContactInfo({
    icon: Icon,
    title,
    value,
}: {
    icon: React.ElementType;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--primary)]">

            <div className="flex items-start gap-4">

                <div className="shrink-0 rounded-lg bg-[var(--primary)]/10 p-3">
                    <Icon
                        size={20}
                        className="text-[var(--primary)]"
                    />
                </div>

                <div>

                    <h3 className="font-semibold text-[var(--foreground)]">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
}