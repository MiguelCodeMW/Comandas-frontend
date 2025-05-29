export type ConfigurarMonedaProps = {
  onGuardado: (nuevaMoneda: string) => Promise<void>;
  monedaActual: string | null;
  onCancelar: () => void;
  errorExterno?: string | null;
};
