"use client";

import { useMemo, useState } from "react";
import {
    Package,
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    FolderPlus,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

type Category = {
    id: string;
    name: string;
};

type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "active" | "out_of_stock";
};

const initialCategories: Category[] = [
    {
        id: "cat-1",
        name: "Living Room",
    },
    {
        id: "cat-2",
        name: "Bedroom",
    },
    {
        id: "cat-3",
        name: "Dining Room",
    },
];

const initialProducts: Product[] = [
    {
        id: "ARK-P-1001",
        name: "Modern Sofa",
        category: "Living Room",
        price: 12500,
        stock: 8,
        status: "active",
    },
    {
        id: "ARK-P-1002",
        name: "Luxury Armchair",
        category: "Living Room",
        price: 6500,
        stock: 12,
        status: "active",
    },
    {
        id: "ARK-P-1003",
        name: "Wooden Dining Table",
        category: "Dining Room",
        price: 18000,
        stock: 0,
        status: "out_of_stock",
    },
];

export default function ProductsPage() {
    const [products, setProducts] =
        useState<Product[]>(initialProducts);

    const [categories, setCategories] =
        useState<Category[]>(initialCategories);

    const [search, setSearch] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [showProductModal, setShowProductModal] =
        useState(false);

    const [showCategoryModal, setShowCategoryModal] =
        useState(false);

    const [editingProduct, setEditingProduct] =
        useState<Product | null>(null);

    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] =
        useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStock, setProductStock] = useState("");

    const [categoryName, setCategoryName] = useState("");

    /* =========================
       Search
    ========================= */

    const filteredProducts = useMemo(() => {
        const value = search.toLowerCase().trim();

        if (!value) return products;

        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(value) ||
                product.category.toLowerCase().includes(value) ||
                product.id.toLowerCase().includes(value)
        );
    }, [products, search]);

    /* =========================
       Product Modal
    ========================= */

    const openAddProduct = () => {
        setEditingProduct(null);

        setProductName("");
        setProductCategory("");
        setProductPrice("");
        setProductStock("");

        setShowProductModal(true);
    };

    const openEditProduct = (product: Product) => {
        setEditingProduct(product);

        setProductName(product.name);
        setProductCategory(product.category);
        setProductPrice(String(product.price));
        setProductStock(String(product.stock));

        setShowProductModal(true);
    };

    const closeProductModal = () => {
        setShowProductModal(false);
        setEditingProduct(null);
    };

    /* =========================
       Add / Edit Product
    ========================= */

    const handleProductSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (
            !productName.trim() ||
            !productCategory ||
            !productPrice ||
            !productStock
        ) {
            return;
        }

        const price = Number(productPrice);
        const stock = Number(productStock);

        if (editingProduct) {
            setProducts((prev) =>
                prev.map((product) =>
                    product.id === editingProduct.id
                        ? {
                            ...product,
                            name: productName,
                            category: productCategory,
                            price,
                            stock,
                            status:
                                stock > 0
                                    ? "active"
                                    : "out_of_stock",
                        }
                        : product
                )
            );
        } else {
            const newProduct: Product = {
                id: `ARK-P-${Date.now()}`,
                name: productName,
                category: productCategory,
                price,
                stock,
                status:
                    stock > 0 ? "active" : "out_of_stock",
            };

            setProducts((prev) => [
                newProduct,
                ...prev,
            ]);
        }

        closeProductModal();
    };

    /* =========================
       Delete Product
    ========================= */

    const deleteProduct = (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        setProducts((prev) =>
            prev.filter((product) => product.id !== id)
        );
    };

    /* =========================
       Add Category
    ========================= */

    const handleAddCategory = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const name = categoryName.trim();

        if (!name) return;

        const exists = categories.some(
            (category) =>
                category.name.toLowerCase() ===
                name.toLowerCase()
        );

        if (exists) {
            alert("This category already exists.");
            return;
        }

        const newCategory: Category = {
            id: `cat-${Date.now()}`,
            name,
        };

        setCategories((prev) => [
            ...prev,
            newCategory,
        ]);

        setCategoryName("");
        setShowCategoryModal(false);
    };

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-8">

            {/* =========================
          Header
      ========================= */}

            <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                <div>
                    <div className="flex items-center gap-3">

                        <Package
                            size={28}
                            className="text-[var(--primary)]"
                        />

                        <h1 className="text-3xl font-bold text-[var(--foreground)]">
                            Products
                        </h1>

                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Manage your products, categories, prices
                        and stock.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                    <button
                        onClick={() =>
                            setShowCategoryModal(true)
                        }
                        className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background)]"
                    >
                        <FolderPlus size={18} />
                        Add Category
                    </button>

                    <button
                        onClick={openAddProduct}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>

                </div>
            </div>

            {/* =========================
          Search
      ========================= */}

            <div className="mb-6 flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 md:flex-row">

                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search products..."
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-3 pe-4 ps-10 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                    />

                </div>

                <div className="flex items-center px-2 text-sm text-[var(--muted)]">
                    {filteredProducts.length} Products
                </div>

            </div>

            {/* =========================
          Products Table
      ========================= */}

            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px] text-sm">

                        <thead className="border-b border-[var(--border)] bg-[var(--background)]">

                            <tr>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Product
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Category
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Price
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Stock
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-start font-semibold text-[var(--foreground)]">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-[var(--border)]">

                            {filteredProducts.map((product) => (

                                <tr
                                    key={product.id}
                                    className="transition hover:bg-[var(--background)]"
                                >

                                    {/* Product */}

                                    <td className="px-5 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary)]">
                                                <Package size={20} />
                                            </div>

                                            <div>

                                                <p className="font-semibold text-[var(--foreground)]">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-xs text-[var(--muted)]">
                                                    {product.id}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Category */}

                                    <td className="px-5 py-5 text-[var(--foreground)]">
                                        {product.category}
                                    </td>

                                    {/* Price */}

                                    <td className="px-5 py-5 font-semibold text-[var(--foreground)]">
                                        {product.price.toLocaleString()} EGP
                                    </td>

                                    {/* Stock */}

                                    <td className="px-5 py-5 text-[var(--foreground)]">
                                        {product.stock}
                                    </td>

                                    {/* Status */}

                                    <td className="px-5 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${product.status === "active"
                                                ? "bg-green-500/10 text-green-600"
                                                : "bg-red-500/10 text-red-600"
                                                }`}
                                        >
                                            {product.status ===
                                                "active"
                                                ? "Active"
                                                : "Out of Stock"}
                                        </span>

                                    </td>

                                    {/* Actions */}

                                    <td className="px-5 py-5">

                                        <div className="flex items-center gap-2">

                                            <button
                                                onClick={() =>
                                                    openEditProduct(product)
                                                }
                                                title="Edit"
                                                className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteProduct(product.id)
                                                }
                                                title="Delete"
                                                className="rounded-md border border-[var(--border)] p-2 text-[var(--muted)] transition hover:bg-red-500/10 hover:text-red-500"
                                            >
                                                <Trash2 size={17} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Empty */}

                {filteredProducts.length === 0 && (

                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

                        <Package
                            size={40}
                            className="mb-4 text-[var(--muted)]"
                        />

                        <h2 className="text-lg font-semibold text-[var(--foreground)]">
                            No products found
                        </h2>

                        <p className="mt-2 text-sm text-[var(--muted)]">
                            Try searching with another name or
                            category.
                        </p>

                    </div>

                )}

            </div>

            {/* =========================
          Add / Edit Product Modal
      ========================= */}

            {showProductModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">

                        {/* Modal Header */}

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-[var(--foreground)]">
                                    {editingProduct
                                        ? "Edit Product"
                                        : "Add Product"}
                                </h2>

                                <p className="mt-1 text-sm text-[var(--muted)]">
                                    {editingProduct
                                        ? "Update product information."
                                        : "Add a new product to your store."}
                                </p>

                            </div>

                            <button
                                onClick={closeProductModal}
                                className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--background)]"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleProductSubmit}
                            className="space-y-5"
                        >
                            {/* image */}

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Product Images
                                </label>

                                <ImageUpload
                                    images={images}
                                    setImages={setImages}
                                />
                            </div>
                            {/* Name */}

                            <div className="space-y-2">

                                <label className="text-sm font-medium text-[var(--foreground)]">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    placeholder="Modern Sofa"
                                    required
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                />

                            </div>

                            {/* Category */}

                            <div className="space-y-2">

                                <label className="text-sm font-medium text-[var(--foreground)]">
                                    Category
                                </label>

                                <select
                                    value={productCategory}
                                    onChange={(e) =>
                                        setProductCategory(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* Price + Stock */}

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={productPrice}
                                        onChange={(e) =>
                                            setProductPrice(e.target.value)
                                        }
                                        placeholder="12500"
                                        required
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                    />

                                </div>

                                <div className="space-y-2">

                                    <label className="text-sm font-medium text-[var(--foreground)]">
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={productStock}
                                        onChange={(e) =>
                                            setProductStock(e.target.value)
                                        }
                                        placeholder="10"
                                        required
                                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}

                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeProductModal}
                                    className="flex-1 rounded-lg border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background)]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    {editingProduct
                                        ? "Save Changes"
                                        : "Add Product"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* =========================
          Add Category Modal
      ========================= */}

            {showCategoryModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-[var(--foreground)]">
                                    Add Category
                                </h2>

                                <p className="mt-1 text-sm text-[var(--muted)]">
                                    Create a new product category.
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setShowCategoryModal(false)
                                }
                                className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--background)]"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <form
                            onSubmit={handleAddCategory}
                            className="space-y-5"
                        >

                            <div className="space-y-2">

                                <label className="text-sm font-medium text-[var(--foreground)]">
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) =>
                                        setCategoryName(e.target.value)
                                    }
                                    placeholder="Bedroom"
                                    required
                                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                />

                            </div>

                            <div className="flex gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCategoryModal(false)
                                    }
                                    className="flex-1 rounded-lg border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background)]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    Add Category
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </main>
    );
}