import { IControl } from "./IControl";
import { IImpacto } from "./IImpacto";
import { IProbabilidad } from "./IProbabilidad";
import { IRespuesta } from "./IRespuesta";

export interface IRiesgo {
    id: number
    nombre: string
    impacto: IImpacto
    probabilidad: IProbabilidad
    respuesta: IRespuesta,
    controles: IControl[]
}

export interface ICreateRiesgo {
    nombre: string
    impactoId: number
    probabilidadId: number
    respuestaId: number
}