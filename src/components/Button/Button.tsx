import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  text: string; // Texto del botón
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>; // Permite funciones síncronas o asíncronas
  navigateTo?: string; // Ruta opcional para redirigir
  className?: string;
  type?: "button" | "submit" | "reset";
};

function Button({
  text,
  onClick,
  navigateTo,
  className,
  type = "button",
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      const result = onClick(e); // Ejecuta la función onClick
      if (result instanceof Promise) {
        result.catch((err) => console.error("Error en onClick:", err)); // Maneja errores en funciones asíncronas
      }
    } else if (navigateTo) {
      navigate(navigateTo); // Navega a la ruta especificada
    }
  };

  return (
    <button onClick={handleClick} className={className} type={type}>
      {text}
    </button>
  );
}

export default Button;
