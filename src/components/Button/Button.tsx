import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  text: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  navigateTo?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // <-- Ya está aquí
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
      const result = onClick(e);
      if (result instanceof Promise) {
        result.catch((err) => console.error("Error en onClick:", err));
      }
    } else if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <button onClick={handleClick} className={className} type={type}>
      {text}
    </button>
  );
}

export default Button;
