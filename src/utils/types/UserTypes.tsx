// src/utils/types/UserTypes.ts

export type Role = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role; // Propiedad 'role' de tipo Role
  // Puedes añadir otras propiedades del usuario si las necesitas aquí
}
