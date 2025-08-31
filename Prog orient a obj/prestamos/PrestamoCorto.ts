import { PrestamoBase } from "./PrestamoBase";

export class PrestamoCorto extends PrestamoBase {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }

  calcularMulta(diasRetraso: number): number {
    return diasRetraso * 100; // Multa doble
  }

  puedeRenovar(): boolean {
    return false; // No se puede renovar
  }
}