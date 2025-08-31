import { Usuario } from "../usuarios/Usuario";
import { PrestamoBase } from "../prestamos/PrestamoBase";


export interface IPoliticaPrestamo {
  puedePrestar(usuario: Usuario, libro: any): boolean;
  calcularPeriodo(usuario: Usuario, periodoBase: number): number;
  procesarPrestamo(usuario: Usuario, libro: any): PrestamoBase;
}