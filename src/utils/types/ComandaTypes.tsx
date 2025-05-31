// // src/utils/types/ComandaTypes.ts

// import { User } from "./UserTypes";
// import { CategoriaProps } from "./CategoriaTypes";

// // --- Definiciones de Tipos Principales ---

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
//   moneda_aplicada?: string; // Opcional, si el backend la devuelve
//   subtotal?: number; // Opcional, si el backend la devuelve o se calcula en el frontend
//   iva?: number; // El porcentaje de IVA aplicado (ej: 0.21). Opcional, si el backend lo devuelve.
//   total_con_iva?: number; // Opcional, si el backend la devuelve
// };

// export type ComandaDashboard = BaseComanda & {
//   usuario?: {
//     id: number;
//     name: string;
//   };
//   total_con_iva?: number; // Para mostrar el total en el dashboard
//   moneda_aplicada?: string; // Para mostrar la moneda en el dashboard
// };

// // --- Definiciones de Props para Componentes ---

// export type ComandaAccionesButtonsProps = {
//   comanda: ComandaData | null;
//   user: User | null; // Espera un objeto User completo
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

import { User } from "./UserTypes";
import { CategoriaProps } from "./CategoriaTypes";

// --- Definiciones de Tipos Principales ---

export type ProductoProps = {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
};

export type ProductoSeleccionado = ProductoProps & {
  cantidad: number;
};

export type ComandaDetalle = {
  id: number;
  producto: ProductoProps;
  cantidad: number;
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
  iva?: number; // El porcentaje de IVA aplicado (ej: 0.21).
  total_con_iva?: number;
};

export type ComandaDashboard = BaseComanda & {
  usuario?: {
    id: number;
    name: string;
  };
  total_con_iva?: number;
  moneda_aplicada?: string;
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
