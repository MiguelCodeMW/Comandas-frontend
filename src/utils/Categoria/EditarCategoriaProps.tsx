export type EditarCategoriaProps = {
  id: number;
  nombreInicial: string;
  onCategoriaEditada: (nuevoNombre: string) => void;
  onCancelar: () => void;
};
