import { ITipoControl } from "./ITipoControl";
import { ITipoEjecucion } from "./ITipoEjecucion";

export interface IControl {
    id: number
    nombre: string
    tipoControl: ITipoControl
    tipoEjecucion: ITipoEjecucion
}

export interface ICreateControl {
    nombre: string
    tipoControlId: number
    tipoEjecucionId: number
}