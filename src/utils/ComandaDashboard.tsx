export type ComandaDashboard = {
  id: number;
  fecha: string;
  estado: "abierta" | "cerrada";
  user_id: number;
  usuario?: {
    id: number;
    name: string;
  };
};
