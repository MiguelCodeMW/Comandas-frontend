// types/CommonTypes.ts
export type ConfigurarMonedaProps = {
  onGuardado: (nuevaMoneda: string) => Promise<void>;
  monedaActual: string | null;
  onCancelar: () => void;
  errorExterno?: string | null;
};

export type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export interface ConfigurarIVAProps {
  // <--- ¡AÑADIDA/CONFIRMADA AQUI!
  onGuardado: (nuevoIva: number) => Promise<void>;
  ivaActual: number | null;
  onCancelar: () => void;
  errorExterno?: string | null;
}

// Si tienes un tipo 'Role' que se usa en varios lugares, también podría ir aquí
// export type Role = "admin" | "user" | "guest";
