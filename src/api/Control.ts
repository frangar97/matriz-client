import { request } from "./generic";
import { IControl, ICreateControl } from "../types/IControl";

export const Control = {
    list: (): Promise<IControl[]> => request.get("control"),
    create: (control: ICreateControl): Promise<IControl> => request.post("control", control)
}