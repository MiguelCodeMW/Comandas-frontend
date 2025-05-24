export type EliminarProductoProps = {
  id: number;
  onProductoEliminado: (id: number, errorMessage: string | null) => void; // Callback para manejar la eliminación
  className?: string; // Clase personalizada opcional
};
