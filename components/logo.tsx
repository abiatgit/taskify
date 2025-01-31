import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingfont = localFont({
  src: "../public/fonts/Outfit-VariableFont_wght.ttf",
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image alt="logo" src={"/logo.svg"} height={30} width={30}></Image>
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingfont.className)}
        >
          taskify
        </p>
      </div>
    </Link>
  );
};
