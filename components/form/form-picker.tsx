"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string,any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to get images from unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);
return isLoading ?
 (
      <div>
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    )
  

  : (
    <div className=" relative ">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto",selectedImageId ===image.id && "ring-2 ring-sky-500"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <Image
              src={image.urls.thumb}
              alt="Unsplash"
              className="object-cover rounded-sm"
              fill
            ></Image>
          </div>
        ))}
      </div>
      {/* <input type="hidden" name={id} value={selectedImageId || ""} />
      {errors?.[id] && (
        <div className="text-red-500 text-sm mt-2">
          {errors[id].join(", ")}
        </div>
      )} */}
    </div>
  );
};
