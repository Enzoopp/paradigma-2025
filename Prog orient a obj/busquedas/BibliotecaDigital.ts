import { IBuscable } from "./interfaces/IBuscable";

export class BibliotecaDigital implements IBuscable {
  private recursosDigitales: any[] = [];

  constructor() {
    // simulacion algunos recursos digitales
    this.recursosDigitales = [
      { titulo: "Curso JavaScript", tipo: "video", url: "https://ejemplo.com/js" },
      { titulo: "Manual TypeScript", tipo: "pdf", url: "https://ejemplo.com/ts.pdf" },
      { titulo: "Conferencia React", tipo: "video", url: "https://ejemplo.com/react" }
    ];
  }

  buscarPor(criterio: string, valor: string): any[] {
    switch (criterio.toLowerCase()) {
      case 'titulo':
        return this.recursosDigitales.filter(recurso => 
          recurso.titulo.toLowerCase().includes(valor.toLowerCase())
        );
      case 'tipo':
        return this.recursosDigitales.filter(recurso => recurso.tipo === valor);
      default:
        return [];
    }
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.recursosDigitales.filter(condicion);
  }

  obtenerTodos(): any[] {
    return [...this.recursosDigitales];
  }
}