import { CategoriaProps } from "./CategoriaProps";

export type FormularioCategoriaProps = {
  onSubmit?: (nombre: string) => Promise<boolean>;
  onCancel?: () => void;
  categoriaInicial?: CategoriaProps | null;
  textoBotonSubmit?: string;
  placeholder?: string;
  limpiarMensajesAlCambiar?: () => void;
};
