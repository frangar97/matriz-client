import { FC, useEffect, useState } from "react"
import { IRiesgo } from "../types/IRiesgo";

type Prop = {
    backgroundColor: string,
    probabilidad: number,
    impacto: number,
    riesgos: IRiesgo[],
    setRiesgos: (riesgos: IRiesgo[]) => void
}

export const Box: FC<Prop> = ({ backgroundColor, probabilidad, impacto, riesgos, setRiesgos }) => {
    const [boxRiesgos, setBoxRiesgos] = useState<IRiesgo[]>([]);

    useEffect(() => {
        const misRiesgos = riesgos.filter(r => r.probabilidad.orden === probabilidad && r.impacto.orden === impacto);
        setBoxRiesgos([...misRiesgos]);
    }, [riesgos])

    return (
        <div onClick={() => { setRiesgos(boxRiesgos) }} style={{ backgroundColor }} className="box">
            <ul>
                {boxRiesgos.map(r => <li key={r.id}>{r.nombre}</li>)}
            </ul>
        </div>
    )
}