import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  text: string; // Texto del botón
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // Evento onClick opcional
  navigateTo?: string; // Ruta opcional para redirigir
};

function Button({ text, onClick, navigateTo }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = onClick ?? (() => navigateTo && navigate(navigateTo));

  return <button onClick={handleClick}>{text}</button>;
}

export default Button;
