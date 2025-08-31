import { PrestamoBase } from "./PrestamoBase";

export class PrestamoDigital extends PrestamoBase {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setFullYear(vencimiento.getFullYear() + 1); // Sin límite práctico
    return vencimiento;
  }

  calcularMulta(diasRetraso: number): number {
    return 0; // Sin multa
  }

  puedeRenovar(): boolean {
    return true;
  }
}