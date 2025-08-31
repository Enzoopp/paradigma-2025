import { IPoliticaPrestamo } from "./IPoliticaPrestamo";
import { Usuario } from "../usuarios/Usuario";
import { PrestamoBase } from "../prestamos/PrestamoBase";
import { PrestamoRegular } from "../prestamos/PrestamoRegular";

export class PoliticaEstudiante implements IPoliticaPrestamo {
  private esEpocaExamenes(): boolean {
    const mes = new Date().getMonth();
    return mes === 5 || mes === 6 || mes === 11 || mes === 0; // Jun, Jul, Dic, Ene
  }

  puedePrestar(usuario: Usuario, libro: any): boolean {
    return usuario.deuda === 0;
  }

  calcularPeriodo(usuario: Usuario, periodoBase: number): number {
    return this.esEpocaExamenes() ? periodoBase * 2 : periodoBase;
  }

  procesarPrestamo(usuario: Usuario, libro: any): PrestamoBase {
    return new PrestamoRegular(libro, usuario);
  }
}