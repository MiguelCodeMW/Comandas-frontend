import { Categoria } from "../../utils/Categoria";

export type CategoriaListProps = {
  categorias: Categoria[];
  editandoId: number | null;
  onEdit: (id: number) => void;
  onCategoriaEditada: (id: number, nuevoNombre: string) => void;
  onCancelar: () => void;
  onEliminar: (id: number) => void;
};
