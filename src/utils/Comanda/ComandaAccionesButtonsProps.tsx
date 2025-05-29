import { ComandaData } from "../../hooks/useComandaDetalle";
import { Role } from "../Role";

export type ComandaAccionesButtonsProps = {
  comanda: ComandaData | null;
  user: Role | null;
  onEditar: () => void;
  onPagar: () => void;
  onBorrar: () => void;
};
