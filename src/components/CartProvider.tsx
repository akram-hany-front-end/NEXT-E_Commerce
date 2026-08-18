"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export type CartItem = {
    id: number;
    name: {
        ar: string;
        en: string;
    };
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
};

const CartContext = createContext<CartContextType | null>(
    null
);

export default function CartProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // تحميل السلة من localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("arkan-cart");

        if (savedCart) {
            const save = () => {

                setCart(JSON.parse(savedCart));

            }
            save()
        }
    }, []);

    // حفظ السلة
    useEffect(() => {
        localStorage.setItem(
            "arkan-cart",
            JSON.stringify(cart)
        );
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingItem = prev.find(
                (product) => product.id === item.id
            );

            if (existingItem) {
                return prev.map((product) =>
                    product.id === item.id
                        ? {
                            ...product,
                            quantity:
                                product.quantity + item.quantity,
                        }
                        : product
                );
            }

            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const increaseQuantity = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}