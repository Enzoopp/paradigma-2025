import { PrestamoBase } from "./PrestamoBase";

export class PrestamoReferencia extends PrestamoBase {
  calcularVencimiento(): Date {
    return new Date(); // Vence inmediatamente (solo consulta)
  }

  calcularMulta(diasRetraso: number): number {
    return 0; // No genera multa
  }

  puedeRenovar(): boolean {
    return false;
  }
}