abstract class Alumno {
    protected codigo: string;
    protected nombre: string;
    protected apellido: string;
    protected notas: number[];

    constructor(codigo: string, nombre: string, apellido: string, notas: number[] = []) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.notas = notas;
    }

    public getNombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }

    public setNotas(notas: number[]): void {
        this.notas = notas;
    }

    public getNotas(): number[] {
        return this.notas;
    }

    public promedio(): number {
        if (this.notas.length === 0) return 0;
        return this.notas.reduce((a, b) => a + b, 0) / this.notas.length;
    }

    // Método abstracto → cada tipo de alumno define su criterio
    abstract aproboCurso(): boolean;
}


// Subclases
class AlumnoInvitado extends Alumno {
    aproboCurso(): boolean {
        return this.notas.length > 0 && this.notas[0] > 60;
    }
}

class AlumnoMedio extends Alumno {
    aproboCurso(): boolean {
        return this.notas.length === 3 && this.promedio() > 70;
    }
}

class AlumnoPremium extends Alumno {
    aproboCurso(): boolean {
        return this.notas.length === 5 && 
               this.notas.every(nota => nota > 70) &&
               this.promedio() > 80;
    }
}


// Gestión del curso
class Curso {
    private alumnos: Alumno[] = [];

    public agregarAlumno(alumno: Alumno): void {
        this.alumnos.push(alumno);
    }

    public listarAprobados(): Alumno[] {
        return this.alumnos.filter(a => a.aproboCurso());
    }

    // Cambiar invitado a otro tipo
    public cambiarTipoAlumno(alumno: AlumnoInvitado, nuevoTipo: 'medio' | 'premium'): Alumno {
        let nuevoAlumno: Alumno;

        if (nuevoTipo === 'medio') {
            nuevoAlumno = new AlumnoMedio(alumno['codigo'], alumno['nombre'], alumno['apellido'], alumno.getNotas());
        } else {
            nuevoAlumno = new AlumnoPremium(alumno['codigo'], alumno['nombre'], alumno['apellido'], alumno.getNotas());
        }

        // Reemplazar en la lista
        this.alumnos = this.alumnos.map(a => a === alumno ? nuevoAlumno : a);

        return nuevoAlumno;
    }
}