import { IImpacto } from "../types/IImpacto";
import { request } from "./generic";

export const Impacto = {
    list: (): Promise<IImpacto[]> => request.get("impacto")
}