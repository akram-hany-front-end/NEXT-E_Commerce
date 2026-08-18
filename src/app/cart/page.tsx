"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { language } = useLanguage();

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  const isArabic = language === "ar";

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-16">

        <div className="mx-auto flex max-w-xl flex-col items-center text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <ShoppingBag
              size={32}
              className="text-[var(--primary)]"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[var(--foreground)]">
            {isArabic
              ? "السلة فارغة"
              : "Your Cart Is Empty"}
          </h1>

          <p className="mt-3 text-[var(--muted)]">
            {isArabic
              ? "لم تقم بإضافة أي منتجات إلى السلة بعد."
              : "You haven't added any products to your cart yet."}
          </p>

          <Link
            href="/products"
            className="mt-7 rounded-lg bg-[var(--primary)] px-7 py-3 font-medium text-white transition hover:opacity-90"
          >
            {isArabic
              ? "تصفح المنتجات"
              : "Browse Products"}
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-[var(--primary)]">
              ARKAN
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
              {isArabic
                ? "سلة المشتريات"
                : "Shopping Cart"}
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-red-500 transition hover:opacity-70"
          >
            <Trash2 size={17} />

            {isArabic
              ? "إفراغ السلة"
              : "Clear Cart"}
          </button>

        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Products */}

          <div className="space-y-4 lg:col-span-2">

            {cart.map((item) => {

              const name = isArabic
                ? item.name.ar
                : item.name.en;

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center"
                >

                  {/* Image */}

                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[var(--background)] sm:h-28 sm:w-28">

                    <Image
                      src={item.image}
                      alt={name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  {/* Info */}

                  <div className="flex flex-1 flex-col">

                    <Link
                      href={`/products/${item.id}`}
                      className="font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]"
                    >
                      {name}
                    </Link>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {item.price.toLocaleString()} EGP
                    </p>

                    {/* Quantity */}

                    <div className="mt-4 flex w-fit items-center overflow-hidden rounded-lg border border-[var(--border)]">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="flex h-9 w-9 items-center justify-center text-[var(--foreground)] hover:bg-[var(--background)]"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="flex h-9 w-10 items-center justify-center border-x border-[var(--border)] text-sm text-[var(--foreground)]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="flex h-9 w-9 items-center justify-center text-[var(--foreground)] hover:bg-[var(--background)]"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                  </div>

                  {/* Total */}

                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-5">

                    <p className="font-bold text-[var(--foreground)]">
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}{" "}
                      EGP
                    </p>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="text-red-500 transition hover:opacity-70"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Summary */}

          <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

            <h2 className="text-xl font-bold text-[var(--foreground)]">
              {isArabic
                ? "ملخص الطلب"
                : "Order Summary"}
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-sm">

                <span className="text-[var(--muted)]">
                  {isArabic
                    ? "عدد المنتجات"
                    : "Items"}
                </span>

                <span className="font-medium text-[var(--foreground)]">
                  {cart.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
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

              <div className="border-t border-[var(--border)] pt-4">

                <div className="flex justify-between">

                  <span className="font-semibold text-[var(--foreground)]">
                    {isArabic
                      ? "الإجمالي"
                      : "Total"}
                  </span>

                  <span className="text-xl font-bold text-[var(--primary)]">
                    {cartTotal.toLocaleString()} EGP
                  </span>

                </div>

              </div>

            </div>

            <Link
              href="/checkout"
              className="mt-7 flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-6 py-4 font-medium text-white transition hover:opacity-90"
            >
              {isArabic
                ? "إتمام الطلب"
                : "Proceed to Checkout"}
            </Link>

            <Link
              href="/products"
              className="mt-3 flex w-full items-center justify-center rounded-lg border border-[var(--border)] px-6 py-4 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              {isArabic
                ? "متابعة التسوق"
                : "Continue Shopping"}
            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}