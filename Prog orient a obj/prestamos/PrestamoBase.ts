import { Usuario } from "../usuarios/Usuario";

export abstract class PrestamoBase {
  constructor(
    public libro: any,
    public usuario: Usuario,
    public fechaInicio: Date = new Date()
  ) {}

  abstract calcularVencimiento(): Date;
  abstract calcularMulta(diasRetraso: number): number;
  abstract puedeRenovar(): boolean;

  get diasRetraso(): number {
    const hoy = new Date();
    const vencimiento = this.calcularVencimiento();
    if (hoy <= vencimiento) return 0;
    return Math.floor((hoy.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
  }
}