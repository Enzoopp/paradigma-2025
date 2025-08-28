class Persona {
    private dni: string;
    private nombre: string;
    private apellido: string;
    private nacionalidad: string;
    private padre: Persona | null;
    private madre: Persona | null;

    constructor(dni: string, nombre: string, apellido: string, nacionalidad: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacionalidad = nacionalidad;
        this.padre = null;
        this.madre = null;
    }

    public getDni(): string {    
        return this.dni;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public getNacionalidad(): string {
        return this.nacionalidad;
    }

    public setPadre(padre: Persona | null): void {
        this.padre = padre;
    }

    public setMadre(madre: Persona | null): void {
        this.madre = madre;
    }

    public getPadre(): Persona | null {
        return this.padre;
    }

    public getMadre(): Persona | null {
        return this.madre;
    }

    public esItaliano(): boolean {
        return this.nacionalidad.toLowerCase() === 'italiana';
    }
}

class ArbolGenealogico {
    private personaPrincipal: Persona;

    constructor(personaPrincipal: Persona) {
        this.personaPrincipal = personaPrincipal;
    }

    public cargarAntepasado(persona: Persona, tipoParentesco: 'padre' | 'madre', antepasado: Persona | null): void {
        if (tipoParentesco === 'padre') {
            persona.setPadre(antepasado);
        } else {
            persona.setMadre(antepasado);
        }
    }

    public esAptoParaCiudadania(): boolean {
        // si la persona principal ya es italiana
        if (this.personaPrincipal.esItaliano()) {
            return true;
        }

        // recorre niveles de antepasados
        return this.verificarAntepasados([this.personaPrincipal], 1);
    }

    private verificarAntepasados(personas: (Persona | null)[], nivel: number): boolean {
        let siguienteNivel: (Persona | null)[] = [];
        let italianosEnNivel = 0;

        for (let persona of personas) {
            if (persona) {
                if (persona.esItaliano()) {
                    italianosEnNivel++;
                }
                // Cargar padres para el siguiente nivel
                siguienteNivel.push(persona.getPadre());
                siguienteNivel.push(persona.getMadre());
            }
        }

        // si cumple la condición en este nivel
        if (italianosEnNivel >= nivel) {
            return true;
        }

        // Si ya no hay más antepasados conocidos se detiene
        if (siguienteNivel.every(p => p === null)) {
            return false;
        }

        // Pasamos al siguiente nivel
        return this.verificarAntepasados(siguienteNivel, nivel + 1);
    }
}

let juan = new Persona("1", "Juan", "Pérez", "Argentina");
let pedro = new Persona("2", "Pedro", "Pérez", "Argentina");
let maria = new Persona("3", "María", "Gómez", "Argentina");

// Abuelos
let jose = new Persona("4", "José", "Pérez", "Italiana");
let ana = new Persona("5", "Ana", "Rossi", "Italiana");
let carlos = new Persona("6", "Carlos", "Gómez", "Argentina");
let laura = new Persona("7", "Laura", "Fernández", "Argentina");

// arman las relaciones
pedro.setPadre(jose);
pedro.setMadre(ana);
maria.setPadre(carlos);
maria.setMadre(laura);

juan.setPadre(pedro);
juan.setMadre(maria);

// árbol genealógico
let arbol = new ArbolGenealogico(juan);


console.log(arbol.esAptoParaCiudadania()); 
