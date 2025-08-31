import { Usuario } from "./Usuario";

export class Visitante extends Usuario {
  get limitePrestamos(): number { return 0; }
  get periodoBasePrestamo(): number { return 0; }

  puedeRetirar(libro: any): boolean {
    return false;
  }

  consultarCatalogo(): void {
    console.log(`${this.nombreCompleto} está consultando el catálogo como visitante`);
  }

  retirar(libro: any, duracion: number): void {
    throw new Error("Los visitantes no pueden retirar libros");
  }

  devolver(libro: any): void {
    throw new Error("Los visitantes no tienen préstamos");
  }

  tienePrestadoLibro(libro: any): any {
    return undefined;
  }
}