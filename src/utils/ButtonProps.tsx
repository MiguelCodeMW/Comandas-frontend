import { MouseEvent } from "react";

export type ButtonProps = {
  text: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  navigateTo?: string;
  className?: string; // Solo usa la clase pasada directamente
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
