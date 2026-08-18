"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { useFavorites } from "@/components/FavoritesProvider";
import { useCart } from "@/components/CartProvider";

export default function FavoritesPage() {
  const { language } = useLanguage();

  const {
    favorites,
    removeFromFavorites,
    clearFavorites,
  } = useFavorites();

  const { addToCart } = useCart();

  const isArabic = language === "ar";

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-medium tracking-[0.2em] text-[var(--primary)]">
              ARKAN
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {isArabic
                ? "المفضلة"
                : "My Favorites"}
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              {isArabic
                ? `${favorites.length} منتجات محفوظة`
                : `${favorites.length} saved products`}
            </p>

          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="flex w-fit items-center gap-2 text-sm text-red-500 transition hover:opacity-70"
            >
              <Trash2 size={17} />

              {isArabic
                ? "مسح المفضلة"
                : "Clear Favorites"}
            </button>
          )}

        </div>

        {/* Empty */}

        {favorites.length === 0 ? (

          <div className="mt-12 flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10">
              <Heart
                size={34}
                className="text-[var(--primary)]"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[var(--foreground)]">
              {isArabic
                ? "المفضلة فارغة"
                : "Your Favorites Are Empty"}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              {isArabic
                ? "احفظ المنتجات التي تعجبك هنا حتى تتمكن من الرجوع إليها لاحقًا."
                : "Save the products you love here so you can easily find them later."}
            </p>

            <Link
              href="/products"
              className="mt-7 rounded-lg bg-[var(--primary)] px-7 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {isArabic
                ? "تصفح المنتجات"
                : "Browse Products"}
            </Link>

          </div>

        ) : (

          /* Products */

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {favorites.map((item) => {

              const name = isArabic
                ? item.name.ar
                : item.name.en;

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--primary)]"
                >

                  {/* Image */}

                  <div className="relative aspect-square overflow-hidden bg-[var(--background)]">

                    <Image
                      src={item.image}
                      alt={name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeFromFavorites(item.id)
                      }
                      className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)]/90 text-red-500 shadow-sm backdrop-blur"
                    >
                      <Heart
                        size={18}
                        fill="currentColor"
                      />
                    </button>

                  </div>

                  {/* Details */}

                  <div className="p-5">

                    <Link
                      href={`/products/${item.id}`}
                      className="block"
                    >
                      <h2 className="font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]">
                        {name}
                      </h2>
                    </Link>

                    <p className="mt-3 text-lg font-bold text-[var(--foreground)]">
                      {item.price.toLocaleString()} EGP
                    </p>

                    <div className="mt-5 flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                          })
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                      >
                        <ShoppingCart size={17} />

                        {isArabic
                          ? "أضف للسلة"
                          : "Add to Cart"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromFavorites(item.id)
                        }
                        className="flex items-center justify-center rounded-lg border border-[var(--border)] px-4 text-red-500 transition hover:border-red-400"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        )}

      </div>

    </main>
  );
}