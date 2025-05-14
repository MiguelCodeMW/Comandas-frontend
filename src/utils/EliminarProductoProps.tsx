export type EliminarProductoProps = {
  id: number;
  onProductoEliminado: (id: number) => void; // Callback para manejar la eliminación
  className?: string; // Clase personalizada opcional
};
