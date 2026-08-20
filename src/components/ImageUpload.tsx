"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";

type ImageUploadProps = {
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ImageUpload({
    images,
    setImages,
}: ImageUploadProps) {
    return (
        <div className="space-y-4">
            <CldUploadWidget
                uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                }
                options={{
                    multiple: true,
                    maxFiles: 5,
                    resourceType: "image",
                    sources: ["local"],
                    clientAllowedFormats: [
                        "jpg",
                        "jpeg",
                        "png",
                        "webp",
                    ],
                    maxFileSize: 5_000_000,
                }}
                onSuccess={(result) => {
                    if (
                        typeof result.info !== "string" &&
                        result.info?.secure_url
                    ) {
                        setImages((prev) => [
                            ...prev,
                            result.info.secure_url,
                        ]);
                    }
                }}
            >
                {({ open }) => (
                    <button
                        type="button"
                        onClick={() => open()}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] px-5 py-8 text-sm text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                        <ImagePlus size={22} />

                        <span>
                            Add Product Images
                        </span>
                    </button>
                )}
            </CldUploadWidget>

            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {images.map((image, index) => (
                        <div
                            key={image}
                            className="group relative overflow-hidden rounded-xl border border-[var(--border)]"
                        >
                            <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="h-32 w-full object-cover"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setImages((prev) =>
                                        prev.filter(
                                            (_, i) =>
                                                i !== index
                                        )
                                    )
                                }
                                className="absolute end-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}