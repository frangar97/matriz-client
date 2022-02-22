import { request } from "./generic";
import { ITipoEjecucion } from "../types/ITipoEjecucion";

export const TipoEjecucion = {
    list: (): Promise<ITipoEjecucion[]> => request.get("tipoejecucion")
}