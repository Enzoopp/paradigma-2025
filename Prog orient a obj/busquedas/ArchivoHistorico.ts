import { IBuscable } from "./interfaces/IBuscable";

export class ArchivoHistorico implements IBuscable {
  private documentos: any[] = [];

  constructor() {
    this.documentos = [
      { titulo: "Acta Fundacional", año: 1920, tipo: "documento" },
      { titulo: "Registro de Socios 1950", año: 1950, tipo: "registro" },
      { titulo: "Historia Local", año: 1980, tipo: "manuscrito" }
    ];
  }

  buscarPor(criterio: string, valor: string): any[] {
    switch (criterio.toLowerCase()) {
      case 'titulo':
        return this.documentos.filter(doc => 
          doc.titulo.toLowerCase().includes(valor.toLowerCase())
        );
      case 'año':
        return this.documentos.filter(doc => doc.año.toString() === valor);
      case 'tipo':
        return this.documentos.filter(doc => doc.tipo === valor);
      default:
        return [];
    }
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.documentos.filter(condicion);
  }

  obtenerTodos(): any[] {
    return [...this.documentos];
  }
}