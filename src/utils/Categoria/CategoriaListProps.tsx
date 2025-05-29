import { CategoriaProps } from "./CategoriaProps";

export type CategoriaListProps = {
  categorias: CategoriaProps[];
  editandoId: number | null;
  onEdit: (id: number) => void;
  onCategoriaEditada: (id: number, nuevoNombre: string) => void;
  onCancelar: () => void;
  onEliminar: (id: number) => void;
};
