// import { MouseEvent } from "react";
// import { useNavigate } from "react-router-dom";

// type ButtonProps = {
//   text: string;
//   onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
//   navigateTo?: string;
//   className?: string;
//   type?: "button" | "submit" | "reset";
//   disabled?: boolean; // <-- Ya está aquí
// };

// function Button({
//   text,
//   onClick,
//   navigateTo,
//   className,
//   type = "button",
// }: ButtonProps) {
//   const navigate = useNavigate();

//   const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
//     if (onClick) {
//       const result = onClick(e);
//       if (result instanceof Promise) {
//         result.catch((err) => console.error("Error en onClick:", err));
//       }
//     } else if (navigateTo) {
//       navigate(navigateTo);
//     }
//   };

//   return (
//     <button onClick={handleClick} className={className} type={type}>
//       {text}
//     </button>
//   );
// }

// export default Button;
// components/Button/Button.tsx
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "../../utils/ButtonProps"; // Asegúrate de que la ruta sea correcta

// type ButtonProps = {
//   text: string;
//   onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
//   navigateTo?: string;
//   className?: string; // Solo usa la clase pasada directamente
//   type?: "button" | "submit" | "reset";
//   disabled?: boolean;
// };

function Button({
  text,
  onClick,
  navigateTo,
  className, // <-- Sin `btn` aquí
  type = "button",
  disabled,
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
    <button
      onClick={handleClick}
      className={className} // <-- Sin `btn` aquí
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
