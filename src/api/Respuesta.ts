import { IRespuesta } from "../types/IRespuesta";
import { request } from "./generic";

export const Respuesta = {
    list: (): Promise<IRespuesta[]> => request.get("respuesta")
}