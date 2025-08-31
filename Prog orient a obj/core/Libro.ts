import { SocioRegular } from "../usuarios/SocioRegular";
import { Autor } from "./Autor";

/**
 * Cada libro tiene sus datos básicos y maneja sus propias reservas
 */
export class Libro {
  private _reservas: SocioRegular[] = [];

  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string
  ) {}

  get titulo(): string { return this._titulo; }
  get autor(): Autor { return this._autor; }
  get isbn(): string { return this._isbn; }
  get reservas(): SocioRegular[] { return this._reservas; }

  // alguien reserva este libro
  agregarReserva(socio: SocioRegular): void {
    if (!this._reservas.includes(socio)) {
      this._reservas.push(socio);
    }
  }

  // el libro se libera, le toca al proximo en la fila
  quitarPrimeraReserva(): SocioRegular | undefined {
    return this._reservas.shift();
  }
  //hola
}