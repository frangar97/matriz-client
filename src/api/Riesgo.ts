import { IAddControlRiesgo, ICreateRiesgo, IRiesgo } from "../types/IRiesgo";
import { request } from "./generic";

export const Riesgo = {
    list: (): Promise<IRiesgo[]> => request.get("riesgo"),
    create: (riesgo: ICreateRiesgo): Promise<IRiesgo> => request.post("riesgo", riesgo),
    addControl: (controles: IAddControlRiesgo): Promise<IRiesgo> => request.post("riesgo/agregarcontrol", controles),
}