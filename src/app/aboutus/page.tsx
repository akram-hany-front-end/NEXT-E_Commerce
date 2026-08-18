"use client";

import { useLanguage } from "@/components/LanguageProvider";
import {
  Award,
  Heart,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 md:px-10 lg:px-16">

      <section className="mx-auto max-w-6xl">

        {/* Hero */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="mb-4 text-sm font-medium tracking-[0.3em] text-[var(--primary)]">
            ARKAN
          </p>

          <h1 className="text-4xl font-bold text-[var(--foreground)] md:text-6xl">
            {isArabic ? "عن أركان" : "About Arkan"}
          </h1>

          <p className="mt-6 text-base leading-8 text-[var(--muted)] md:text-lg">
            {isArabic
              ? "أركان هو متجر أثاث إلكتروني يجمع بين التصميم الأنيق والجودة العالية، لنقدم لك قطع أثاث تضيف لمسة مميزة إلى منزلك."
              : "Arkan is a furniture e-commerce store that combines elegant design with high quality, bringing you furniture pieces that add a distinctive touch to your home."}
          </p>

        </div>

        {/* Story */}

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">

            <p className="mb-3 text-sm font-medium text-[var(--primary)]">
              {isArabic ? "قصتنا" : "Our Story"}
            </p>

            <h2 className="text-3xl font-bold text-[var(--foreground)]">
              {isArabic
                ? "نصنع مساحات تشبهك"
                : "Creating spaces that feel like you"}
            </h2>

            <p className="mt-5 leading-8 text-[var(--muted)]">
              {isArabic
                ? "بدأت أركان بفكرة بسيطة: جعل شراء الأثاث تجربة سهلة وممتعة. نهتم بالتفاصيل، ونختار منتجاتنا بعناية حتى نساعدك على بناء منزل يعكس ذوقك وشخصيتك."
                : "Arkan started with a simple idea: making furniture shopping easier and more enjoyable. We care about the details and carefully select our products to help you create a home that reflects your taste and personality."}
            </p>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              {isArabic
                ? "من القطع العصرية إلى التصميمات الكلاسيكية، نعمل على توفير مجموعة متنوعة تناسب مختلف الأذواق والاحتياجات."
                : "From modern pieces to classic designs, we work to provide a diverse collection that suits different tastes and needs."}
            </p>

          </div>

          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

            <div className="text-center">

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[var(--primary)]/10">

                <span className="text-4xl font-bold text-[var(--primary)]">
                  A
                </span>

              </div>

              <h3 className="mt-6 text-2xl font-bold text-[var(--foreground)]">
                ARKAN
              </h3>

              <p className="mt-2 text-sm text-[var(--muted)]">
                {isArabic
                  ? "أثاث بتصميم يليق بمساحتك"
                  : "Furniture designed for your space"}
              </p>

            </div>

          </div>

        </div>

        {/* Why Arkan */}

        <div className="mt-20">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-medium tracking-[0.2em] text-[var(--primary)]">
              {isArabic ? "لماذا أركان؟" : "WHY ARKAN"}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)]">
              {isArabic
                ? "لماذا تختار أركان؟"
                : "Why choose Arkan?"}
            </h2>

            <p className="mt-4 text-[var(--muted)]">
              {isArabic
                ? "نركز على الجودة والتصميم وتجربة العميل في كل خطوة."
                : "We focus on quality, design, and customer experience at every step."}
            </p>

          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              icon={Award}
              title={isArabic ? "جودة عالية" : "High Quality"}
              description={
                isArabic
                  ? "نختار منتجاتنا بعناية لضمان أفضل جودة."
                  : "We carefully select our products to ensure high quality."
              }
            />

            <Feature
              icon={Heart}
              title={isArabic ? "تصميم مميز" : "Unique Design"}
              description={
                isArabic
                  ? "تصميمات عصرية تناسب مختلف الأذواق."
                  : "Modern designs that fit different tastes."
              }
            />

            <Feature
              icon={Truck}
              title={isArabic ? "توصيل موثوق" : "Reliable Delivery"}
              description={
                isArabic
                  ? "نسعى لتوصيل طلبك بأمان وفي الوقت المناسب."
                  : "We aim to deliver your order safely and on time."
              }
            />

            <Feature
              icon={ShieldCheck}
              title={isArabic ? "تجربة آمنة" : "Secure Experience"}
              description={
                isArabic
                  ? "نحافظ على بياناتك ونجعل تجربة الشراء آمنة."
                  : "We protect your data and provide a secure shopping experience."
              }
            />

          </div>

        </div>

        {/* Mission */}

        <div className="mt-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center md:px-12">

          <p className="text-sm font-medium tracking-[0.2em] text-[var(--primary)]">
            {isArabic ? "رؤيتنا" : "OUR VISION"}
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight text-[var(--foreground)] md:text-4xl">
            {isArabic
              ? "أن نجعل اختيار الأثاث المثالي لمنزلك تجربة بسيطة ومميزة."
              : "To make choosing the perfect furniture for your home a simple and memorable experience."}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[var(--muted)]">
            {isArabic
              ? "هدفنا هو أن تكون أركان وجهتك المفضلة عندما تبحث عن الجودة والتصميم والقيمة."
              : "Our goal is to make Arkan your favorite destination when you are looking for quality, design, and value."}
          </p>

        </div>

      </section>

    </main>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center transition hover:-translate-y-1 hover:border-[var(--primary)]">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
        <Icon
          size={22}
          className="text-[var(--primary)]"
        />
      </div>

      <h3 className="mt-5 font-bold text-[var(--foreground)]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {description}
      </p>

    </div>
  );
}