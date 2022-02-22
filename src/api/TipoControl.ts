import { request } from "./generic";
import { ITipoControl } from "../types/ITipoControl";

export const TipoControl = {
    list: (): Promise<ITipoControl[]> => request.get("tipocontrol")
}