"use client";
import { useLanguage } from "@/components/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { translations } from "./translation";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
export default function Navbar() {
    const { language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const t = translations[language];
    return (
        <nav className="flex items-center justify-between border-b px-6 py-4">
            <Link href="/">

                <Image className="bg-gray-600 rounded-full p-2" src="/logo.webp" alt="Logo" width={40} height={40} />

            </Link>
            <div className="flex items-center gap-6">
                <Link href="/">
                    {t.navbar.home}
                </Link>
                <Link href="/">
                    {t.navbar.products}
                </Link>
                <Link href="/">
                    {t.navbar.about}
                </Link>
                <Link href="/">
                    {t.navbar.contact}
                </Link>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() =>
                            setLanguage(language === "ar" ? "en" : "ar")
                        }
                        className="rounded-md border px-4 py-2"
                    >
                        {language === "ar" ? "English" : "العربية"}
                    </button>


                    <button
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                        className="rounded-full border px-2 py-2"
                    >
                        {theme === "light" ? <Sun size={18}/> : <Moon size={18}/>
                        }
                    </button>
                </div>
            </div>
        </nav>
    );
}