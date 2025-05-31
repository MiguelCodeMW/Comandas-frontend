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
