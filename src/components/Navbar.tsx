"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";

import Image from "next/image";
import Link from "next/link";

import { translations } from "./translation";

import {
    Moon,
    Search,
    Sun,
    Menu,
    X,
} from "lucide-react";

export default function Navbar() {
    const { language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = translations[language];

    const toggleLanguage = () => {
        setLanguage(language === "ar" ? "en" : "ar");
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="relative flex items-center justify-center gap-50 border-b border-[var(--border)] bg-[var(--background)] px-3 py-4 sm:gap-6 md:gap-10 lg:gap-20 xl:gap-50">

            {/* Logo */}
            <Link href="/" className="shrink-0">
                <Image
                    className="rounded-full bg-gray-600 p-2"
                    src="/logo.webp"
                    alt="Logo"
                    width={40}
                    height={40}
                />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-6 md:flex">

                <Link
                    href="/"
                    className="text-[var(--foreground)] transition-opacity hover:opacity-70"
                >
                    {t.navbar.home}
                </Link>

                <Link
                    href="/products"
                    className="text-[var(--foreground)] transition-opacity hover:opacity-70"
                >
                    {t.navbar.products}
                </Link>

                <Link
                    href="/about"
                    className="text-[var(--foreground)] transition-opacity hover:opacity-70"
                >
                    {t.navbar.about}
                </Link>

                <Link
                    href="/contact"
                    className="text-[var(--foreground)] transition-opacity hover:opacity-70"
                >
                    {t.navbar.contact}
                </Link>

            </div>

            {/* Desktop Search */}
            <div className="relative hidden md:block">

                <Search
                    size={18}
                    className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                    type="search"
                    placeholder={t.navbar.search}
                    className="w-48 rounded-full border border-[var(--border)] bg-[var(--surface)] py-2 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted)] focus:w-64 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                />

            </div>

            {/* Desktop Buttons */}
            <div className="hidden items-center gap-4 md:flex">

                {/* Language */}
                <button
                    onClick={toggleLanguage}
                    className="cursor-pointer rounded-md border border-[var(--border)] px-2 py-2 text-xs text-[var(--foreground)] transition hover:bg-[var(--surface)]"
                >
                    {language === "ar" ? "EN" : "AR"}
                </button>

                {/* Theme */}
                <button
                    onClick={toggleTheme}
                    className="cursor-pointer rounded-full border border-[var(--border)] px-2 py-2 text-[var(--foreground)] transition hover:bg-[var(--surface)]"
                >
                    {theme === "light" ? (
                        <Sun size={18} />
                    ) : (
                        <Moon size={18} />
                    )}
                </button>

            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="cursor-pointer rounded-md border border-[var(--border)] p-2 text-[var(--foreground)] md:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMenuOpen ? (
                    <X size={22} />
                ) : (
                    <Menu size={22} />
                )}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">

                    {/* Overlay */}
                    <div
                        onClick={closeMenu}
                        className="absolute inset-0 bg-black/40"
                    />

                    {/* Drawer */}
                    <div className="absolute end-0 top-0 flex h-full w-full flex-col bg-[var(--background)] p-6 shadow-xl">

                        {/* Drawer Header */}
                        <div className="flex items-center justify-between">

                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="flex items-center gap-3"
                            >
                                <Image
                                    className="rounded-full bg-gray-600 p-2"
                                    src="/logo.webp"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                />

                                <span className="text-lg font-semibold text-[var(--foreground)]">
                                    ARKAN
                                </span>
                            </Link>

                            <button
                                onClick={closeMenu}
                                className="cursor-pointer rounded-md border border-[var(--border)] p-2 text-[var(--foreground)]"
                                aria-label="Close menu"
                            >
                                <X size={22} />
                            </button>

                        </div>

                        {/* Mobile Links */}
                        <div className="mt-14 flex flex-col gap-7">

                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="text-xl text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                            >
                                {t.navbar.home}
                            </Link>

                            <Link
                                href="/products"
                                onClick={closeMenu}
                                className="text-xl text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                            >
                                {t.navbar.products}
                            </Link>

                            <Link
                                href="/about"
                                onClick={closeMenu}
                                className="text-xl text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                            >
                                {t.navbar.about}
                            </Link>

                            <Link
                                href="/contact"
                                onClick={closeMenu}
                                className="text-xl text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                            >
                                {t.navbar.contact}
                            </Link>

                        </div>

                        {/* Mobile Search */}
                        <div className="relative mt-10">

                            <Search
                                size={18}
                                className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                            />

                            <input
                                type="search"
                                placeholder={t.navbar.search}
                                className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                            />

                        </div>

                        {/* Mobile Actions */}
                        <div className="mt-8 flex items-center gap-4 border-t border-[var(--border)] pt-6">

                            <button
                                onClick={toggleLanguage}
                                className="cursor-pointer rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface)]"
                            >
                                {language === "ar" ? "EN" : "AR"}
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="cursor-pointer rounded-full border border-[var(--border)] p-2 text-[var(--foreground)] transition hover:bg-[var(--surface)]"
                            >
                                {theme === "light" ? (
                                    <Sun size={18} />
                                ) : (
                                    <Moon size={18} />
                                )}
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </nav>
    );
}