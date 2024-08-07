import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const Logo  = () => {
  return (
    <div className="md:flex items-center gap-x-2">
      <Image
        src="/logo-dark.svg"
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden block"
      />
      <Image
        src="/logo.svg"
        height="40"
        width="40"
        alt="Logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold text-blue-700 dark:text-blue-300", font.className)}>calendarApp</p>
    </div>
  )
}
  