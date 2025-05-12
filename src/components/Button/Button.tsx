import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  text: string; // Texto del botón
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // Evento onClick opcional
  navigateTo?: string; // Ruta opcional para redirigir
  className?: string;
  type?: "button" | "submit" | "reset";
};

function Button({ text, onClick, navigateTo, className }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = onClick ?? (() => navigateTo && navigate(navigateTo));

  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  );
}

export default Button;
