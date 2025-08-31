import { IBuscable } from "./interfaces/IBuscable";

export class CatalogoBiblioteca implements IBuscable {
  constructor(private libros: any[]) {}

  buscarPor(criterio: string, valor: string): any[] {
    switch (criterio.toLowerCase()) {
      case 'titulo':
        return this.libros.filter(libro => 
          libro.titulo.toLowerCase().includes(valor.toLowerCase())
        );
      case 'autor':
        return this.libros.filter(libro => 
          libro.autor.nombre.toLowerCase().includes(valor.toLowerCase())
        );
      case 'isbn':
        return this.libros.filter(libro => libro.isbn === valor);
      default:
        return [];
    }
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.libros.filter(condicion);
  }

  obtenerTodos(): any[] {
    return [...this.libros];
  }
}