
import { BibliotecaExtendida } from "./Biblioteca";
import { PoliticaEstricta, PoliticaEstudiante } from "./politicas";
import { Autor } from "./core/Autor";

const miBiblioteca = new BibliotecaExtendida();
console.log("biblioteca iniciada");

const autor1 = miBiblioteca.agregarAutor("Gabriel García Márquez", "Escritor colombiano", 1927);
const autor2 = miBiblioteca.agregarAutor("George Orwell", "Escritor británico", 1903);

const libro1 = miBiblioteca.agregarLibro("Cien años de soledad", autor1, "978-0307350443");
const libro2 = miBiblioteca.agregarLibro("1984", autor2, "978-0451524935");
const libro3 = miBiblioteca.agregarLibro("El amor en los tiempos del cólera", autor1, "978-0307387111");

console.log("\n--- Autores y Libros Agregados ---");
console.log(`Total de libros en inventario: ${miBiblioteca["inventario"].length}`);

const socioRegular = miBiblioteca.registrarSocioRegular(1, "Juan", "Pérez");
const socioVIP = miBiblioteca.registrarSocioVIP(2, "Ana", "García");
const empleado = miBiblioteca.registrarEmpleado(3, "Carlos", "Martínez");
const visitante = miBiblioteca.registrarVisitante(4, "Lucía", "Fernández");

console.log("\n--- usuarios registrados ---");
miBiblioteca["usuarios"].forEach(u => console.log(`- ${u.nombreCompleto} (${u.constructor.name})`));

console.log("\n --- demostracion de prestamos ---");

//  prestamo para un visitante (fallo)
try {
    miBiblioteca.procesarPrestamo(visitante.id, libro1.isbn);
} catch (error) {
    console.log(`Error esperado: ${error.message}`);
}

// prestamo regular para SocioRegular
try {
    miBiblioteca.procesarPrestamo(socioRegular.id, libro1.isbn, 'regular');
} catch (error) {
    console.log(`Error inesperado: ${error.message}`);
}

// prestamo corto para SocioVIP
try {
    miBiblioteca.procesarPrestamo(socioVIP.id, libro2.isbn, 'corto');
} catch (error) {
    console.log(`Error inesperado: ${error.message}`);
}

// cambia la politica de prestamoo
console.log("\n--- Cambio de Política a Estricta ---");
miBiblioteca.cambiarPolitica(new PoliticaEstricta());

// simulacion de que el socio regular tiene una deuda (probar la política estricta)
socioRegular["_deuda"] = 100; 
console.log(`${socioRegular.nombreCompleto} ahora tiene una deuda de ${socioRegular.deuda}.`);

// prestamo con política estricta y deuda (fallo)
try {
    miBiblioteca.procesarPrestamo(socioRegular.id, libro3.isbn);
} catch (error) {
    console.log(`Error esperado con Política Estricta: ${error.message}`);
}

// socio paga deuda
socioRegular.saldarDeuda();

// intentar de nuevo el prestamo (funciona)
try {
    miBiblioteca.procesarPrestamo(socioRegular.id, libro3.isbn);
} catch (error) {
    console.log(`Error inesperado: ${error.message}`);
}


//busqueda universal
console.log("\n--- Demostración de Búsqueda Universal ---");

//libro por título
miBiblioteca.buscarUniversal("titulo", "1984");

//recurso digital por tipo
miBiblioteca.buscarUniversal("tipo", "pdf");

//documento histórico por año
miBiblioteca.buscarUniversal("año", "1920");

console.log("\n--- Demostración de Eventos ---");
const evento = miBiblioteca.crearEvento("Club de Lectura: Orwell", new Date(), "Discusión sobre '1984'");
miBiblioteca.inscribirSocioAEvento(socioVIP.id, evento.nombre);
miBiblioteca.inscribirSocioAEvento(socioRegular.id, evento.nombre);
miBiblioteca.notificarParticipantes(evento.nombre, "¡No olviden leer el primer capítulo!");


