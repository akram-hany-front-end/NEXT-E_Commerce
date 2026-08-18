"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type Language = "ar" | "en";

const LanguageContext = createContext<{
    language: Language;
    setLanguage: (language: Language) => void;
} | null>(null);

export default function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [language, setLanguage] = useState<Language>("ar");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");

        if (savedLanguage === "en") {
            const save = () => {
                setLanguage("en");

            }
            save()
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";

        localStorage.setItem("language", language);
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}