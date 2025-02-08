"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-error";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

interface UnsplashImage {
  id: string;
  urls: {
    thumb: string;
    full:string
  };
  user: { name: string };
  links: { html: string };

}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<UnsplashImage[]>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as UnsplashImage[];
          setImages(newImages);
        } else {
          console.error("Failed to get images from unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  return isLoading ? (
    <div>
      <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
    </div>
  ) : (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
              // selectedImageId === image.id && "ring-2 ring-sky-700"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              onChange={() => setSelectedImageId(image.id)}
              disabled={pending}
              value={`${image.id} | ${image.urls.thumb} | ${image.urls.full} |${image.links.html} |${image.user.name} `}
            ></input>
            <Image
              src={image.urls.thumb}
              alt="Unsplash image"
              className="object-cover rounded-sm"
              fill
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}

            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px]
               truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" error={errors}></FormErrors>
    </div>
  );
};
