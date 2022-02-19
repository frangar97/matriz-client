import { IProbabilidad } from "../types/IProbabilidad";
import { request } from "./generic";

export const Probabilidad = {
    list: (): Promise<IProbabilidad[]> => request.get("probabilidad")
}