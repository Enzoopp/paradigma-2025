import { IPoliticaPrestamo } from "./IPoliticaPrestamo";
import { Usuario } from "../usuarios/Usuario";
import { PrestamoBase } from "../prestamos/PrestamoBase";
import { PrestamoRegular } from "../prestamos/PrestamoRegular";

export class PoliticaFlexible implements IPoliticaPrestamo {
  puedePrestar(usuario: Usuario, libro: any): boolean {
    return true; // Siempre permite
  }

  calcularPeriodo(usuario: Usuario, periodoBase: number): number {
    const tieneVencidos = usuario.historialLectura.some(prestamo => {
      if (prestamo instanceof PrestamoBase) {
        return prestamo.diasRetraso > 0;
      }
      return false;
    });
    return tieneVencidos ? Math.floor(periodoBase / 2) : periodoBase;
  }

  procesarPrestamo(usuario: Usuario, libro: any): PrestamoBase {
    return new PrestamoRegular(libro, usuario);
  }
}