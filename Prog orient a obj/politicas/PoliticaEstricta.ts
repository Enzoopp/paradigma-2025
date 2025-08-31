import { IPoliticaPrestamo } from "./IPoliticaPrestamo";
import { Usuario } from "../usuarios/Usuario";
import { PrestamoBase } from "../prestamos/PrestamoBase";
import { PrestamoRegular } from "../prestamos/PrestamoRegular";

export class PoliticaEstricta implements IPoliticaPrestamo {
  puedePrestar(usuario: Usuario, libro: any): boolean {
    // No permite préstamos si hay libros vencidos
    const tieneVencidos = usuario.historialLectura.some(prestamo => {
      if (prestamo instanceof PrestamoBase) {
        return prestamo.diasRetraso > 0;
      }
      return false;
    });
    return !tieneVencidos && usuario.deuda === 0;
  }

  calcularPeriodo(usuario: Usuario, periodoBase: number): number {
    return periodoBase;
  }

  procesarPrestamo(usuario: Usuario, libro: any): PrestamoBase {
    return new PrestamoRegular(libro, usuario);
  }
}