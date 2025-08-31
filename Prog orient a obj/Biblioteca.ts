import { Usuario } from "./usuarios/Usuario";
import { SocioRegular } from "./usuarios/SocioRegular";
import { SocioVIP } from "./usuarios/SocioVIP";
import { Empleado } from "./usuarios/Empleado";
import { Visitante } from "./usuarios/Visitante";
import { IPoliticaPrestamo } from "./politicas/IPoliticaPrestamo";
import { PoliticaFlexible } from "./politicas/PoliticaFlexible";
import { PrestamoBase } from "./prestamos/PrestamoBase";
import { PrestamoRegular } from "./prestamos/PrestamoRegular";
import { PrestamoCorto } from "./prestamos/PrestamoCorto";
import { PrestamoReferencia } from "./prestamos/PrestamoReferencia";
import { PrestamoDigital } from "./prestamos/PrestamoDigital";
import { BuscadorUniversal } from "./busquedas/BuscadorUniversal";
import { CatalogoBiblioteca } from "./busquedas/CatalogoBiblioteca";
import { BibliotecaDigital } from "./busquedas/BibliotecaDigital";
import { ArchivoHistorico } from "./busquedas/ArchivoHistorico";
import { BaseConocimiento } from "./busquedas/BaseConocimineto";
import { EventoBiblioteca } from "./core/EventoBiblioteca";

export class BibliotecaExtendida {
  private inventario: any[] = [];
  private usuarios: Usuario[] = [];
  private autores: any[] = [];
  private eventos: EventoBiblioteca[] = [];
  private politicaActual: IPoliticaPrestamo;
  private buscadorUniversal: BuscadorUniversal;

  constructor() {
    this.politicaActual = new PoliticaFlexible(); // Política por defecto
    this.buscadorUniversal = new BuscadorUniversal();
    this.inicializarSistemasBusqueda();
  }

  private inicializarSistemasBusqueda(): void {
    const catalogo = new CatalogoBiblioteca(this.inventario);
    const digital = new BibliotecaDigital();
    const archivo = new ArchivoHistorico();
    const base = new BaseConocimiento();

    this.buscadorUniversal.agregarSistema("Catálogo", catalogo);
    this.buscadorUniversal.agregarSistema("Digital", digital);
    this.buscadorUniversal.agregarSistema("Archivo", archivo);
    this.buscadorUniversal.agregarSistema("Conocimiento", base);
  }

  // Gestión de usuarios
  registrarSocioRegular(id: number, nombre: string, apellido: string): SocioRegular {
    const socio = new SocioRegular(id, nombre, apellido);
    this.usuarios.push(socio); // <-- CORRECTO
    return socio;
  }

  registrarSocioVIP(id: number, nombre: string, apellido: string): SocioVIP {
    const socio = new SocioVIP(id, nombre, apellido);
    this.usuarios.push(socio);
    return socio;
  }

  registrarEmpleado(id: number, nombre: string, apellido: string): Empleado {
    const empleado = new Empleado(id, nombre, apellido);
    this.usuarios.push(empleado);
    return empleado;
  }

  registrarVisitante(id: number, nombre: string, apellido: string): Visitante {
    const visitante = new Visitante(id, nombre, apellido);
    this.usuarios.push(visitante);
    return visitante;
  }

  // Cambio de política dinámico
  cambiarPolitica(nuevaPolitica: IPoliticaPrestamo): void {
    this.politicaActual = nuevaPolitica;
    console.log("Política de préstamo actualizada");
  }

  // Préstamo con polimorfismo
  procesarPrestamo(usuarioId: number, libroISBN: string, tipoPrestamo: string = 'regular'): void {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    const libro = this.inventario.find(l => l.isbn === libroISBN);

    if (!usuario || !libro) {
      throw new Error("Usuario o libro no encontrado");
    }

    if (!usuario.puedeRetirar(libro)) {
        throw new Error(`El usuario ${usuario.nombreCompleto} no puede retirar este libro.`);
    }

    if (!this.politicaActual.puedePrestar(usuario, libro)) {
      throw new Error("La política actual no permite este préstamo");
    }

    let prestamo: PrestamoBase;
    switch (tipoPrestamo.toLowerCase()) {
      case 'corto':
        prestamo = new PrestamoCorto(libro, usuario);
        break;
      case 'referencia':
        prestamo = new PrestamoReferencia(libro, usuario);
        break;
      case 'digital':
        prestamo = new PrestamoDigital(libro, usuario);
        break;
      default:
        prestamo = new PrestamoRegular(libro, usuario);
    }

    console.log(`Préstamo ${tipoPrestamo} procesado para ${usuario.nombreCompleto}`);
    console.log(`Vencimiento: ${prestamo.calcularVencimiento().toLocaleDateString()}`);
  }

  // Búsqueda universal
  buscarUniversal(criterio: string, valor: string): void {
    const resultados = this.buscadorUniversal.buscarEnTodos(criterio, valor);
    
    if (resultados.length === 0) {
      console.log("No se encontraron resultados");
      return;
    }

    console.log(`
--- Resultados de búsqueda: ${criterio} = "${valor}" ---`);
    resultados.forEach(({ sistema, resultados }) => {
      console.log(`
${sistema}:
`);
      resultados.forEach(resultado => {
        console.log(`  - ${resultado.titulo || resultado.nombre || JSON.stringify(resultado)}`);
      });
    });
  }

  // Agregar libro (mantener compatibilidad)
  agregarLibro(titulo: string, autor: any, isbn: string): any {
    const libro = { titulo, autor, isbn };
    this.inventario.push(libro);
    return libro;
  }

  // Agregar autor
  agregarAutor(nombre: string, biografia: string, añoNacimiento: number): any {
    const autor = { nombre, biografia, añoNacimiento };
    this.autores.push(autor);
    return autor;
  }

  // Gestión de Eventos
  crearEvento(nombre: string, fecha: Date, descripcion: string): EventoBiblioteca {
    const evento = new EventoBiblioteca(nombre, fecha, descripcion);
    this.eventos.push(evento);
    console.log(`
Evento "${nombre}" creado.`);
    return evento;
  }

  inscribirSocioAEvento(socioId: number, eventoNombre: string): void {
    const socio = this.usuarios.find(u => u.id === socioId);
    const evento = this.eventos.find(e => e.nombre === eventoNombre);

    if (!socio || !evento) {
      throw new Error("Socio o evento no encontrado");
    }

    if (socio instanceof SocioRegular || socio instanceof SocioVIP) {
      evento.agregarParticipante(socio);
    } else {
      console.log(`Lo sentimos, solo los socios regulares y VIP pueden inscribirse a eventos.`);
    }
  }

  notificarParticipantes(eventoNombre: string, mensaje: string): void {
    const evento = this.eventos.find(e => e.nombre === eventoNombre);
    if (!evento) {
      throw new Error("Evento no encontrado");
    }
    evento.notificarParticipantes(mensaje);
  }
}