export interface IBuscable {
  buscarPor(criterio: string, valor: string): any[];
  filtrar(condicion: (item: any) => boolean): any[];
  obtenerTodos(): any[];
}