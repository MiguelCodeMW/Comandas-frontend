// import { User } from "./UserTypes";
// import { CategoriaProps } from "./CategoriaTypes";

// export type ProductoProps = {
//   id: number;
//   nombre: string;
//   precio: number;
//   categoria_id: number;
// };

// export type ProductoSeleccionado = ProductoProps & {
//   cantidad: number;
// };

// export type ComandaDetalle = {
//   id: number;
//   producto: ProductoProps;
//   cantidad: number;
// };

// export type BaseComanda = {
//   id: number;
//   fecha: string;
//   estado: string; // Ej: "abierta", "cerrada", "pagada"
//   user_id: number;
// };

// export type ComandaData = BaseComanda & {
//   detalles: ComandaDetalle[];
//   moneda_aplicada?: string;
//   subtotal?: number;
//   iva?: number; // El porcentaje de IVA aplicado (ej: 0.21).
//   total_con_iva?: number;
// };

// export type ComandaDashboard = BaseComanda & {
//   usuario?: {
//     id: number;
//     name: string;
//   };
//   total_con_iva?: number;
//   moneda_aplicada?: string;
// };

// // --- Definiciones de Props para Componentes ---

// export type ComandaAccionesButtonsProps = {
//   comanda: ComandaData | null;
//   user: User | null;
//   onEditar: () => void;
//   onPagar: () => void;
//   onBorrar: () => void;
// };

// export type ComandaDetallesItemsListProps = {
//   detalles: ComandaDetalle[];
//   monedaComanda: string | null;
// };

// export type ComandaResumenTotalesProps = {
//   subtotal: number;
//   ivaPorcentaje: number;
//   totalConIva: number;
//   monedaComanda: string | null;
// };

// export type ProductosSeleccionadosListProps = {
//   productos: ProductoSeleccionado[];
//   onAumentar: (id: number) => void;
//   onDisminuir: (id: number) => void;
// };

// export type ProductoSelectorListProps = {
//   productos: ProductoProps[];
//   onProductoClick: (producto: ProductoProps) => void;
// };

// export type DashboardComandasListProps = {
//   comandas: ComandaDashboard[];
//   mostrarPagadas: boolean;
// };

// // --- Otros Tipos Relacionados con Productos y Formularios ---

// export type NuevoProductoData = Omit<ProductoProps, "id">;

// export type EliminarProductoProps = {
//   id: number;
//   onProductoEliminado: (id: number, errorMessage: string | null) => void;
//   className?: string;
// };

// export type FormularioProductoProps = {
//   onSubmit?: (data: NuevoProductoData | ProductoProps) => Promise<boolean>;
//   onCancel?: () => void;
//   productoInicial?: ProductoProps | null;
//   categoriasDisponibles?: CategoriaProps[];
//   textoBotonSubmit?: string;
//   limpiarMensajesAlCambiar?: () => void;
// };

// export type ProductoListProps = {
//   productos: ProductoProps[];
//   categorias: CategoriaProps[];
//   editandoProductoId: number | null;
//   productoEnEdicion: ProductoProps | null;
//   onSetEditandoProductoId: (id: number) => void;
//   onDeleteProducto: (id: number, errorMessage: string | null) => void;
//   onProductoEditado: (
//     id: number,
//     productoData: ProductoProps
//   ) => Promise<boolean>;
//   onCancelarEdicion: () => void;
//   limpiarMensajesAlCambiar?: () => void;
// };
// src/utils/types/ComandaTypes.ts

import { User } from "./UserTypes"; // Asegúrate de que UserTypes.ts contenga la definición de User
import { CategoriaProps } from "./CategoriaTypes";

export type ProductoProps = {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
  // Si tienes otras propiedades del producto, añádelas aquí.
  // Por ejemplo:
  // descripcion?: string;
  // imagen_url?: string;
};

export type ProductoSeleccionado = ProductoProps & {
  cantidad: number;
};

export type ComandaDetalle = {
  id: number;
  producto: ProductoProps;
  cantidad: number;
  // Si tienes otras propiedades en el detalle de comanda (ej: comanda_id, producto_id), añádelas.
  // Por ejemplo:
  // comanda_id: number;
  // producto_id: number;
};

// --- NUEVOS TIPOS PARA MESAS ---
export type MesaData = {
  id: number;
  numero: number;
  estado: "libre" | "ocupada";
  created_at: string;
  updated_at: string;
};

export type BaseComanda = {
  id: number;
  fecha: string;
  estado: string; // Ej: "abierta", "cerrada", "pagada"
  user_id: number;
};

export type ComandaData = BaseComanda & {
  detalles: ComandaDetalle[];
  moneda_aplicada?: string;
  subtotal?: number;
  iva?: number | null; // El porcentaje de IVA aplicado (ej: 0.21). Puede ser null.
  total_con_iva?: number;
  mesa_id?: number | null; // AÑADIDO: ID de la mesa asociada (puede ser null)
  mesa?: MesaData | null; // AÑADIDO: Objeto de la mesa si se carga con la relación
};

export type ComandaDashboard = BaseComanda & {
  usuario?: {
    id: number;
    name: string;
  };
  total_con_iva?: number;
  moneda_aplicada?: string;
  mesa_id?: number | null; // AÑADIDO: Para mostrar la mesa en el dashboard
  mesa?: MesaData | null; // AÑADIDO: Para mostrar el número de mesa en el dashboard
};

// --- Definiciones de Props para Componentes ---

export type ComandaAccionesButtonsProps = {
  comanda: ComandaData | null;
  user: User | null;
  onEditar: () => void;
  onPagar: () => void;
  onBorrar: () => void;
};

export type ComandaDetallesItemsListProps = {
  detalles: ComandaDetalle[];
  monedaComanda: string | null;
};

export type ComandaResumenTotalesProps = {
  subtotal: number;
  ivaPorcentaje: number;
  totalConIva: number;
  monedaComanda: string | null;
};

export type ProductosSeleccionadosListProps = {
  productos: ProductoSeleccionado[];
  onAumentar: (id: number) => void;
  onDisminuir: (id: number) => void;
};

export type ProductoSelectorListProps = {
  productos: ProductoProps[];
  onProductoClick: (producto: ProductoProps) => void;
};

export type DashboardComandasListProps = {
  comandas: ComandaDashboard[];
  mostrarPagadas: boolean;
};

// --- Otros Tipos Relacionados con Productos y Formularios ---

export type NuevoProductoData = Omit<ProductoProps, "id">;

export type EliminarProductoProps = {
  id: number;
  onProductoEliminado: (id: number, errorMessage: string | null) => void;
  className?: string;
};

export type FormularioProductoProps = {
  onSubmit?: (data: NuevoProductoData | ProductoProps) => Promise<boolean>;
  onCancel?: () => void;
  productoInicial?: ProductoProps | null;
  categoriasDisponibles?: CategoriaProps[];
  textoBotonSubmit?: string;
  limpiarMensajesAlCambiar?: () => void;
};

export type ProductoListProps = {
  productos: ProductoProps[];
  categorias: CategoriaProps[];
  editandoProductoId: number | null;
  productoEnEdicion: ProductoProps | null;
  onSetEditandoProductoId: (id: number) => void;
  onDeleteProducto: (id: number, errorMessage: string | null) => void;
  onProductoEditado: (
    id: number,
    productoData: ProductoProps
  ) => Promise<boolean>;
  onCancelarEdicion: () => void;
  limpiarMensajesAlCambiar?: () => void;
};
