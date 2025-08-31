import { IPoliticaPrestamo } from "./IPoliticaPrestamo";
import { Usuario } from "../usuarios/Usuario";
import { PrestamoBase } from "../prestamos/PrestamoBase";
import { PrestamoRegular } from "../prestamos/PrestamoRegular";

export class PoliticaDocente implements IPoliticaPrestamo {
  puedePrestar(usuario: Usuario, libro: any): boolean {
    return true;
  }

  calcularPeriodo(usuario: Usuario, periodoBase: number): number {
    return periodoBase * 3; // Período extendido
  }

  procesarPrestamo(usuario: Usuario, libro: any): PrestamoBase {
    return new PrestamoRegular(libro, usuario);
  }
}