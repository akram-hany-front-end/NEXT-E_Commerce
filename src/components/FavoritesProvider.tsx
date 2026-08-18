"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export type FavoriteItem = {
    id: number;
    name: {
        ar: string;
        en: string;
    };
    price: number;
    image: string;
};

type FavoritesContextType = {
    favorites: FavoriteItem[];
    addToFavorites: (item: FavoriteItem) => void;
    removeFromFavorites: (id: number) => void;
    toggleFavorite: (item: FavoriteItem) => void;
    isFavorite: (id: number) => boolean;
    clearFavorites: () => void;
};

const FavoritesContext =
    createContext<FavoritesContextType | null>(null);

export default function FavoritesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [favorites, setFavorites] = useState<
        FavoriteItem[]
    >([]);

    // Load favorites
    useEffect(() => {
        const savedFavorites =
            localStorage.getItem("arkan-favorites");

        if (savedFavorites) {
            const save = () => {
                            setFavorites(JSON.parse(savedFavorites));

            }
            save()
        }
    }, []);

    // Save favorites
    useEffect(() => {
        localStorage.setItem(
            "arkan-favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    const addToFavorites = (item: FavoriteItem) => {
        setFavorites((prev) => {
            if (prev.some((product) => product.id === item.id)) {
                return prev;
            }

            return [...prev, item];
        });
    };

    const removeFromFavorites = (id: number) => {
        setFavorites((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const toggleFavorite = (item: FavoriteItem) => {
        setFavorites((prev) => {
            const exists = prev.some(
                (product) => product.id === item.id
            );

            if (exists) {
                return prev.filter(
                    (product) => product.id !== item.id
                );
            }

            return [...prev, item];
        });
    };

    const isFavorite = (id: number) => {
        return favorites.some(
            (item) => item.id === id
        );
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                toggleFavorite,
                isFavorite,
                clearFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider"
        );
    }

    return context;
}