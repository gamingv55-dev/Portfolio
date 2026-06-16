import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** cn — слива Tailwind класове с разрешаване на конфликти (shadcn стандарт). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
