"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  category: {
    ar: string;
    en: string;
  };
  price: number;
  oldPrice?: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: {
      ar: "أريكة مودرن فاخرة",
      en: "Luxury Modern Sofa",
    },
    category: {
      ar: "أرائك",
      en: "Sofas",
    },
    price: 12500,
    oldPrice: 15000,
    image: "/products/sofa-1.webp",
  },
  {
    id: 2,
    name: {
      ar: "كرسي فاخر",
      en: "Luxury Armchair",
    },
    category: {
      ar: "كراسي",
      en: "Chairs",
    },
    price: 6500,
    image: "/products/chair-1.webp",
  },
  {
    id: 3,
    name: {
      ar: "طاولة طعام خشبية",
      en: "Wooden Dining Table",
    },
    category: {
      ar: "طاولات",
      en: "Tables",
    },
    price: 18000,
    image: "/products/table-1.webp",
  },
  {
    id: 4,
    name: {
      ar: "غرفة نوم مودرن",
      en: "Modern Bedroom Set",
    },
    category: {
      ar: "غرف نوم",
      en: "Bedrooms",
    },
    price: 25000,
    image: "/products/bedroom-1.webp",
  },
  {
    id: 5,
    name: {
      ar: "طاولة جانبية",
      en: "Side Table",
    },
    category: {
      ar: "طاولات",
      en: "Tables",
    },
    price: 4500,
    image: "/products/table-2.webp",
  },
  {
    id: 6,
    name: {
      ar: "كرسي استرخاء",
      en: "Relaxing Chair",
    },
    category: {
      ar: "كراسي",
      en: "Chairs",
    },
    price: 7200,
    image: "/products/chair-2.webp",
  },
];

const categories = [
  {
    ar: "الكل",
    en: "All",
  },
  {
    ar: "أرائك",
    en: "Sofas",
  },
  {
    ar: "كراسي",
    en: "Chairs",
  },
  {
    ar: "طاولات",
    en: "Tables",
  },
  {
    ar: "غرف نوم",
    en: "Bedrooms",
  },
];

export default function ProductsPage() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sort, setSort] = useState("default");

  const [maxPrice, setMaxPrice] = useState(30000);

  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const productName = isArabic
        ? product.name.ar
        : product.name.en;

      const productCategory = isArabic
        ? product.category.ar
        : product.category.en;

      const matchesSearch = productName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        productCategory === selectedCategory;

      const matchesPrice = product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) => {
        const nameA = isArabic
          ? a.name.ar
          : a.name.en;

        const nameB = isArabic
          ? b.name.ar
          : b.name.en;

        return nameA.localeCompare(nameB);
      });
    }

    return result;
  }, [
    search,
    selectedCategory,
    sort,
    maxPrice,
    isArabic,
  ]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            Header
        ========================= */}

        <section className="text-center">

          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-[var(--primary)]">
            ARKAN
          </p>

          <h1 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">
            {isArabic
              ? "اكتشف مجموعتنا"
              : "Explore Our Collection"}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            {isArabic
              ? "اكتشف مجموعة مختارة من الأثاث المصمم ليضيف لمسة من الأناقة والراحة إلى منزلك."
              : "Discover our curated collection of furniture designed to bring elegance and comfort to your home."}
          </p>

        </section>

        {/* =========================
            Search
        ========================= */}

        <div className="mx-auto mt-10 max-w-2xl">

          <div className="relative">

            <Search
              size={20}
              className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />

            <input
              type="search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder={
                isArabic
                  ? "ابحث عن منتج..."
                  : "Search products..."
              }
              className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-4 pe-5 ps-12 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
            />

          </div>

        </div>

        {/* =========================
            Categories
        ========================= */}

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">

          {categories.map((category) => {

            const value = isArabic
              ? category.ar
              : category.en;

            const isActive =
              selectedCategory === category.en;

            return (
              <button
                key={category.en}
                onClick={() =>
                  setSelectedCategory(category.en)
                }
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--primary)]"
                }`}
              >
                {value}
              </button>
            );
          })}

        </div>

        {/* =========================
            Filters
        ========================= */}

        <div className="mt-8 flex flex-col gap-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
            <SlidersHorizontal size={18} />

            {isArabic
              ? "تصفية المنتجات"
              : "Filter Products"}
          </div>

          {/* Price */}

          <div className="flex flex-1 items-center gap-4 lg:max-w-md">

            <span className="shrink-0 text-sm text-[var(--muted)]">
              {isArabic ? "السعر" : "Price"}
            </span>

            <input
              type="range"
              min="0"
              max="30000"
              step="500"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="w-full accent-[var(--primary)]"
            />

            <span className="shrink-0 text-sm font-medium text-[var(--foreground)]">
              {maxPrice.toLocaleString()} EGP
            </span>

          </div>

          {/* Sort */}

          <div className="relative">

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="appearance-none rounded-lg border border-[var(--border)] bg-[var(--background)] py-2.5 pe-10 ps-4 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
            >
              <option value="default">
                {isArabic
                  ? "الترتيب الافتراضي"
                  : "Default Sorting"}
              </option>

              <option value="low">
                {isArabic
                  ? "السعر: من الأقل للأعلى"
                  : "Price: Low to High"}
              </option>

              <option value="high">
                {isArabic
                  ? "السعر: من الأعلى للأقل"
                  : "Price: High to Low"}
              </option>

              <option value="name">
                {isArabic
                  ? "الاسم"
                  : "Name"}
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />

          </div>

        </div>

        {/* =========================
            Results
        ========================= */}

        <div className="mt-8 flex items-center justify-between">

          <p className="text-sm text-[var(--muted)]">
            {filteredProducts.length}{" "}
            {isArabic
              ? "منتجات"
              : "products"}
          </p>

        </div>

        {/* =========================
            Products Grid
        ========================= */}

        {filteredProducts.length > 0 ? (

          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => {

              const name = isArabic
                ? product.name.ar
                : product.name.en;

              const category = isArabic
                ? product.category.ar
                : product.category.en;

              const isFavorite =
                favorites.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--primary)]"
                >

                  {/* Image */}

                  <div className="relative aspect-square overflow-hidden bg-[var(--background)]">

                    <Image
                      src={product.image}
                      alt={name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Favorite */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleFavorite(product.id)
                      }
                      className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)]/90 text-[var(--foreground)] shadow-sm backdrop-blur transition hover:text-red-500"
                    >
                      <Heart
                        size={18}
                        fill={
                          isFavorite
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {/* Sale */}

                    {product.oldPrice && (
                      <span className="absolute start-4 top-4 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-medium text-white">
                        {isArabic
                          ? "خصم"
                          : "Sale"}
                      </span>
                    )}

                  </div>

                  {/* Details */}

                  <div className="p-5">

                    <p className="text-xs font-medium text-[var(--primary)]">
                      {category}
                    </p>

                    <Link
                      href={`/products/${product.id}`}
                      className="mt-2 block"
                    >
                      <h2 className="font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]">
                        {name}
                      </h2>
                    </Link>

                    {/* Price */}

                    <div className="mt-4 flex items-center gap-2">

                      <span className="text-lg font-bold text-[var(--foreground)]">
                        {product.price.toLocaleString()} EGP
                      </span>

                      {product.oldPrice && (
                        <span className="text-sm text-[var(--muted)] line-through">
                          {product.oldPrice.toLocaleString()} EGP
                        </span>
                      )}

                    </div>

                    {/* Add Cart */}

                    <button
                      type="button"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      <ShoppingCart size={17} />

                      {isArabic
                        ? "أضف إلى السلة"
                        : "Add to Cart"}
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        ) : (

          /* Empty */

          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
              <Search
                size={26}
                className="text-[var(--primary)]"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[var(--foreground)]">
              {isArabic
                ? "لم نجد أي منتجات"
                : "No products found"}
            </h2>

            <p className="mt-2 text-sm text-[var(--muted)]">
              {isArabic
                ? "جرب تغيير البحث أو الفلاتر."
                : "Try changing your search or filters."}
            </p>

          </div>

        )}

      </div>

    </main>
  );
}