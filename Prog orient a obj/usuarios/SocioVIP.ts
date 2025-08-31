import { Usuario } from "./Usuario";

export class SocioVIP extends Usuario {
  get limitePrestamos(): number { return 5; }
  get periodoBasePrestamo(): number { return 21; }

  puedeRetirar(libro: any): boolean {
    return this.prestamos.length < this.limitePrestamos;
  }

  retirar(libro: any, duracion: number): void {
    if (!this.puedeRetirar(libro)) {
      throw new Error("Has alcanzado tu límite de préstamos VIP");
    }
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + (duracion + 7));
    this.prestamos.push({ libro, vencimiento });
  }

  devolver(libro: any): void {
    const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
    if (!prestamo) {
      throw new Error("Este libro no está en tu lista de préstamos");
    }

    console.log(`${libro.titulo} devuelto. Como socio VIP, no tienes multas.`);

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    this._historialLectura.push(libro);
  }

  tienePrestadoLibro(libro: any): any {
    return this.prestamos.find((p) => p.libro.isbn === libro.isbn);
  }
}