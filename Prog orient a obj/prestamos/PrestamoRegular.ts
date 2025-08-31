import { PrestamoBase } from "./PrestamoBase";


export class PrestamoRegular extends PrestamoBase {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }

  calcularMulta(diasRetraso: number): number {
    return diasRetraso * 50;
  }

  puedeRenovar(): boolean {
    return this.diasRetraso === 0;
  }
}