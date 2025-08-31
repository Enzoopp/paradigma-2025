import { IBuscable } from "./interfaces/IBuscable";

export class BaseConocimiento implements IBuscable {
  private articulos: any[] = [];

  constructor() {
    this.articulos = [
      { titulo: "Inteligencia Artificial", autor: "Dr. Smith", categoria: "tecnología" },
      { titulo: "Historia Medieval", autor: "Dra. García", categoria: "historia" },
      { titulo: "Química Orgánica", autor: "Prof. López", categoria: "ciencias" }
    ];
  }

  buscarPor(criterio: string, valor: string): any[] {
    switch (criterio.toLowerCase()) {
      case 'titulo':
        return this.articulos.filter(art => 
          art.titulo.toLowerCase().includes(valor.toLowerCase())
        );
      case 'autor':
        return this.articulos.filter(art => 
          art.autor.toLowerCase().includes(valor.toLowerCase())
        );
      case 'categoria':
        return this.articulos.filter(art => art.categoria === valor);
      default:
        return [];
    }
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.articulos.filter(condicion);
  }

  obtenerTodos(): any[] {
    return [...this.articulos];
  }
}