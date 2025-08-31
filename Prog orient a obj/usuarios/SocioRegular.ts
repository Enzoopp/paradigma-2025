import { Usuario } from "./Usuario";

export class SocioRegular extends Usuario {
  get limitePrestamos(): number { return 3; }
  get periodoBasePrestamo(): number { return 14; }

  puedeRetirar(libro: any): boolean {
    return this.prestamos.length < this.limitePrestamos && this._deuda === 0;
  }

  // MISMA lógica que tenía tu clase Socio original
  retirar(libro: any, duracion: number): void {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No puedes retirar más libros");
    }
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push({ libro, vencimiento });
  }

  // MISMA lógica que tenía tu clase Socio original  
  devolver(libro: any): void {
    const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
    if (!prestamo) {
      throw new Error("Este libro no está en tu lista de préstamos");
    }

    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasDeRetraso = Math.floor((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      const multa = diasDeRetraso * 50;
      this._deuda += multa;
      console.log(`${libro.titulo} se entregó ${diasDeRetraso} días tarde. Multa: ${multa}`);
    } else {
      console.log(`Lo devolviste a tiempo`);
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    this._historialLectura.push(libro);
    console.log(`"${libro.titulo}" se agregó a tu historial de lectura, ${this.nombreCompleto}`);
  }

  // MISMA lógica que tenía tu clase Socio original
  tienePrestadoLibro(libro: any): any {
    return this.prestamos.find((p) => p.libro.isbn === libro.isbn);
  }
}