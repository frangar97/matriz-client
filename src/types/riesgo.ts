import { Impacto } from "./impacto";
import { Probabilidad } from "./probabilidad";
import { Respuesta } from "./respuesta";

export interface Riesgo {
    id: number
    nombre: string
    impacto: Impacto
    probabilidad: Probabilidad
    respuesta: Respuesta
}