import { IBuscable } from "./interfaces/IBuscable";

export class BuscadorUniversal {
  private sistemas: { nombre: string, sistema: IBuscable }[] = [];

  agregarSistema(nombre: string, sistema: IBuscable): void {
    this.sistemas.push({ nombre, sistema });
  }

  buscarEnTodos(criterio: string, valor: string): { sistema: string, resultados: any[] }[] {
    return this.sistemas.map(({ nombre, sistema }) => ({
      sistema: nombre,
      resultados: sistema.buscarPor(criterio, valor)
    })).filter(resultado => resultado.resultados.length > 0);
  }

  buscarEnSistema(nombreSistema: string, criterio: string, valor: string): any[] {
    const sistema = this.sistemas.find(s => s.nombre === nombreSistema);
    return sistema ? sistema.sistema.buscarPor(criterio, valor) : [];
  }

  filtrarEnTodos(condicion: (item: any) => boolean): { sistema: string, resultados: any[] }[] {
    return this.sistemas.map(({ nombre, sistema }) => ({
      sistema: nombre,
      resultados: sistema.filtrar(condicion)
    })).filter(resultado => resultado.resultados.length > 0);
  }
}