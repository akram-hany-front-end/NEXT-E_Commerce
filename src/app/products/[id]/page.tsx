"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useFavorites } from "@/components/FavoritesProvider";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

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
  description: {
    ar: string;
    en: string;
  };
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  stock: number;
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
    description: {
      ar: "أريكة عصرية بتصميم أنيق ومريح، مصنوعة من خامات عالية الجودة لتمنح منزلك مظهرًا فاخرًا وتجربة جلوس مريحة.",
      en: "A modern sofa with an elegant and comfortable design, crafted from high-quality materials to give your home a luxurious look and a comfortable seating experience.",
    },
    price: 12500,
    oldPrice: 15000,
    image: "/products/sofa-1.webp",
    images: [
      "/products/sofa-1.webp",
      "/products/sofa-1.webp",
      "/products/sofa-1.webp",
    ],
    stock: 8,
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
    description: {
      ar: "كرسي فاخر بتصميم بسيط وأنيق يناسب غرف المعيشة والمكاتب والمساحات العصرية.",
      en: "A luxurious armchair with a simple and elegant design that fits living rooms, offices, and modern spaces.",
    },
    price: 6500,
    image: "/products/chair-1.webp",
    images: [
      "/products/chair-1.webp",
      "/products/chair-1.webp",
      "/products/chair-1.webp",
    ],
    stock: 12,
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
    description: {
      ar: "طاولة طعام خشبية بتصميم أنيق ومساحة مناسبة للعائلة، تجمع بين المتانة والجمال.",
      en: "An elegant wooden dining table with enough space for the family, combining durability and beautiful design.",
    },
    price: 18000,
    image: "/products/table-1.webp",
    images: [
      "/products/table-1.webp",
      "/products/table-1.webp",
      "/products/table-1.webp",
    ],
    stock: 5,
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
    description: {
      ar: "غرفة نوم مودرن بتصميم هادئ وأنيق، مثالية لإنشاء مساحة مريحة وعصرية.",
      en: "A modern bedroom set with a calm and elegant design, perfect for creating a comfortable and contemporary space.",
    },
    price: 25000,
    image: "/products/bedroom-1.webp",
    images: [
      "/products/bedroom-1.webp",
      "/products/bedroom-1.webp",
      "/products/bedroom-1.webp",
    ],
    stock: 3,
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
    description: {
      ar: "طاولة جانبية صغيرة وأنيقة مناسبة بجانب الأريكة أو السرير.",
      en: "A small and elegant side table that fits perfectly beside a sofa or bed.",
    },
    price: 4500,
    image: "/products/table-2.webp",
    images: [
      "/products/table-2.webp",
      "/products/table-2.webp",
      "/products/table-2.webp",
    ],
    stock: 15,
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
    description: {
      ar: "كرسي مريح للاسترخاء بتصميم عصري وخامات مختارة بعناية.",
      en: "A comfortable relaxation chair with a modern design and carefully selected materials.",
    },
    price: 7200,
    image: "/products/chair-2.webp",
    images: [
      "/products/chair-2.webp",
      "/products/chair-2.webp",
      "/products/chair-2.webp",
    ],
    stock: 7,
  },
];

export default function ProductDetailsPage() {
  const { addToCart } = useCart();
  const {
  toggleFavorite,
  isFavorite,
} = useFavorites();
  const params = useParams();

  const { language } = useLanguage();

  const isArabic = language === "ar";

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState(0);

  const id = Number(params.id);

  const product = products.find(
    (item) => item.id === id
  );

  /*
   * Product not found
   */

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            {isArabic
              ? "المنتج غير موجود"
              : "Product Not Found"}
          </h1>

          <p className="mt-3 text-[var(--muted)]">
            {isArabic
              ? "عذرًا، لم نتمكن من العثور على هذا المنتج."
              : "Sorry, we couldn't find this product."}
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white"
          >
            {isArabic
              ? "العودة للمنتجات"
              : "Back to Products"}
          </Link>

        </div>

      </main>
    );
  }
const favorite = isFavorite(product.id);

  const name = isArabic
    ? product.name.ar
    : product.name.en;

  const category = isArabic
    ? product.category.ar
    : product.category.en;

  const description = isArabic
    ? product.description.ar
    : product.description.en;

  const increaseQuantity = () => {
    setQuantity((prev) =>
      prev < product.stock ? prev + 1 : prev
    );
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : prev
    );
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            Breadcrumb
        ========================= */}

        <div className="mb-8 flex items-center gap-2 text-sm text-[var(--muted)]">

          <Link
            href="/products"
            className="transition hover:text-[var(--primary)]"
          >
            {isArabic ? "المنتجات" : "Products"}
          </Link>

          {isArabic ? (
            <ArrowLeft size={15} />
          ) : (
            <ArrowRight size={15} />
          )}

          <span className="text-[var(--foreground)]">
            {name}
          </span>

        </div>

        {/* =========================
            Product
        ========================= */}

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* =========================
              Images
          ========================= */}

          <div>

            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

              <Image
                src={product.images[selectedImage]}
                alt={name}
                fill
                priority
                className="object-cover"
              />

              {product.oldPrice && (
                <span className="absolute start-5 top-5 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white">
                  {isArabic ? "خصم" : "Sale"}
                </span>
              )}

            <button
  type="button"
  onClick={() =>
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }
  className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)]/90 text-[var(--foreground)] shadow-sm backdrop-blur transition hover:text-red-500"
>
  <Heart
    size={20}
    fill={favorite ? "currentColor" : "none"}
    className={favorite ? "text-red-500" : ""}
  />
</button>

            </div>

            {/* Thumbnails */}

            <div className="mt-4 grid grid-cols-3 gap-3">

              {product.images.map((image, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setSelectedImage(index)
                  }
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 ${selectedImage === index
                    ? "border-[var(--primary)]"
                    : "border-[var(--border)]"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>

              ))}

            </div>

          </div>

          {/* =========================
              Details
          ========================= */}

          <div className="flex flex-col justify-center">

            <p className="text-sm font-medium text-[var(--primary)]">
              {category}
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {name}
            </h1>

            {/* Rating */}

            <div className="mt-5 flex items-center gap-2">

              <div className="flex gap-1 text-[var(--primary)]">
                {"★★★★★"}
              </div>

              <span className="text-sm text-[var(--muted)]">
                (24{" "}
                {isArabic
                  ? "تقييم"
                  : "reviews"}
                )
              </span>

            </div>

            {/* Price */}

            <div className="mt-6 flex items-center gap-3">

              <span className="text-3xl font-bold text-[var(--foreground)]">
                {product.price.toLocaleString()} EGP
              </span>

              {product.oldPrice && (
                <span className="text-lg text-[var(--muted)] line-through">
                  {product.oldPrice.toLocaleString()} EGP
                </span>
              )}

            </div>

            {/* Description */}

            <p className="mt-6 max-w-xl leading-8 text-[var(--muted)]">
              {description}
            </p>

            {/* Stock */}

            <div className="mt-6">

              {product.stock > 0 ? (
                <p className="text-sm font-medium text-green-600">
                  {isArabic
                    ? `متوفر في المخزون (${product.stock} قطع)`
                    : `In stock (${product.stock} items)`}
                </p>
              ) : (
                <p className="text-sm font-medium text-red-500">
                  {isArabic
                    ? "غير متوفر"
                    : "Out of stock"}
                </p>
              )}

            </div>

            {/* Quantity */}

            <div className="mt-6">

              <p className="mb-3 text-sm font-medium text-[var(--foreground)]">
                {isArabic
                  ? "الكمية"
                  : "Quantity"}
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-lg border border-[var(--border)]">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-[var(--foreground)] transition hover:bg-[var(--background)]"
                >
                  <Minus size={16} />
                </button>

                <span className="flex h-11 w-14 items-center justify-center border-x border-[var(--border)] text-sm font-medium text-[var(--foreground)]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-[var(--foreground)] transition hover:bg-[var(--background)]"
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>

            {/* Actions */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                disabled={product.stock === 0}
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                  })
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-4 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart size={19} />

                {isArabic
                  ? "أضف إلى السلة"
                  : "Add to Cart"}
              </button>
          <button
  type="button"
  onClick={() =>
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }
  className={`flex items-center justify-center gap-2 rounded-lg border px-6 py-4 font-medium transition ${
    favorite
      ? "border-red-400 text-red-500"
      : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]"
  }`}
>
  <Heart
    size={19}
    fill={favorite ? "currentColor" : "none"}
  />

  {favorite
    ? isArabic
      ? "إزالة من المفضلة"
      : "Remove from Wishlist"
    : isArabic
    ? "المفضلة"
    : "Wishlist"}
</button>
            </div>

            {/* Features */}

            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[var(--border)] pt-7 sm:grid-cols-3">

              <ProductFeature
                icon={Truck}
                title={
                  isArabic
                    ? "توصيل سريع"
                    : "Fast Delivery"
                }
              />

              <ProductFeature
                icon={ShieldCheck}
                title={
                  isArabic
                    ? "دفع آمن"
                    : "Secure Payment"
                }
              />

              <ProductFeature
                icon={RotateCcw}
                title={
                  isArabic
                    ? "إرجاع سهل"
                    : "Easy Returns"
                }
              />

            </div>

          </div>

        </section>

        {/* =========================
            Product Information
        ========================= */}

        <section className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">

          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            {isArabic
              ? "تفاصيل المنتج"
              : "Product Details"}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Detail
              title={
                isArabic
                  ? "الفئة"
                  : "Category"
              }
              value={category}
            />

            <Detail
              title={
                isArabic
                  ? "الحالة"
                  : "Condition"
              }
              value={
                isArabic
                  ? "جديد"
                  : "New"
              }
            />

            <Detail
              title={
                isArabic
                  ? "التوفر"
                  : "Availability"
              }
              value={
                product.stock > 0
                  ? isArabic
                    ? "متوفر"
                    : "In Stock"
                  : isArabic
                    ? "غير متوفر"
                    : "Out of Stock"
              }
            />

            <Detail
              title={
                isArabic
                  ? "الضمان"
                  : "Warranty"
              }
              value={
                isArabic
                  ? "سنة واحدة"
                  : "1 Year"
              }
            />

          </div>

        </section>

      </div>

    </main>
  );
}

/* =========================
   Product Feature
========================= */

function ProductFeature({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="rounded-lg bg-[var(--primary)]/10 p-2.5">
        <Icon
          size={18}
          className="text-[var(--primary)]"
        />
      </div>

      <span className="text-xs font-medium text-[var(--foreground)]">
        {title}
      </span>

    </div>
  );
}

/* =========================
  Detail
========================= */

function Detail({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

      <p className="text-xs text-[var(--muted)]">
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
        {value}
      </p>

    </div>
  );
}