export abstract class Usuario {
    protected prestamos: any[] = [];
    protected _deuda: number = 0;
    protected _historialLectura: any[] = [];

    constructor(
        protected _id: number,
        protected _nombre: string,
        protected _apellido: string
    ) {}

    get id(): number { return this._id; }
    get nombre(): string { return this._nombre; }
    get apellido(): string { return this._apellido; }
    get nombreCompleto(): string { return `${this.nombre} ${this.apellido}`; }
    get deuda(): number { return this._deuda; }
    get historialLectura(): any[] { return this._historialLectura; }

    abstract get limitePrestamos(): number;
    abstract get periodoBasePrestamo(): number;
    abstract puedeRetirar(libro: any): boolean;
    abstract devolver(libro: any): void;
    abstract tienePrestadoLibro(libro: any): any;

    saldarDeuda(): void {
        this._deuda = 0;
        console.log(`${this.nombreCompleto}, Tu deuda está saldada`);
    }
}