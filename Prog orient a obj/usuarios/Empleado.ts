import { Usuario } from "./Usuario";

export class Empleado extends Usuario {
  get limitePrestamos(): number { return -1; } 
  get periodoBasePrestamo(): number { return 30; }

  puedeRetirar(libro: any): boolean {
    return true; 
  }

  puedeAccederReferencia(): boolean {
    return true;
  }

  retirar(libro: any, duracion: number): void {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push({ libro, vencimiento });
    console.log(`Empleado ${this.nombreCompleto} retiró "${libro.titulo}"`);
  }

  devolver(libro: any): void {
    const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
    if (!prestamo) {
      throw new Error("Este libro no está en tu lista de préstamos");
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    this._historialLectura.push(libro);
    console.log(`Empleado devolvió "${libro.titulo}"`);
  }

  tienePrestadoLibro(libro: any): any {
    return this.prestamos.find((p) => p.libro.isbn === libro.isbn);
  }
}