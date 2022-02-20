import { useEffect, useState } from "react";
import { Box } from "../components/Box"
import axios from 'axios';
import { IRiesgo } from "../types/IRiesgo";
import { useSelector } from "react-redux";
import { globalSelector } from "../store";

export const MatrizPage = () => {
    const [riesgos, setRiesgos] = useState<IRiesgo[]>([]);
    const [riesgosSeleccionados, setRiesgosSeleccionados] = useState<IRiesgo[]>([]);
    const probabilidades = useSelector(globalSelector).probabilidades;
    const impactos = useSelector(globalSelector).impactos;

    const obtenerRiesgos = async () => {
        try {
            const request = await axios.get("http://localhost:3001/api/riesgo");
            setRiesgos(request.data);
        } catch (err) {

        }
    }

    useEffect(() => {
        obtenerRiesgos();
    }, [])

    return (
        <div>
            <h1 className="text-center">Pagina Matriz</h1>

            <div className="wrapper mt-5">
                {probabilidades.length > 0 && <div className="center_item">{probabilidades[0].probabilidad}</div>}
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={1} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={2} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={3} backgroundColor="tomato" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={4} backgroundColor="tomato" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={5} backgroundColor="tomato" riesgos={riesgos} />

                {probabilidades.length > 0 && <div className="center_item">{probabilidades[1].probabilidad}</div>}
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={2} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={3} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={4} backgroundColor="tomato" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={5} backgroundColor="tomato" riesgos={riesgos} />

                {probabilidades.length > 0 && <div className="center_item">{probabilidades[2].probabilidad}</div>}
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={2} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={3} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={4} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={5} backgroundColor="tomato" riesgos={riesgos} />

                {probabilidades.length > 0 && <div className="center_item">{probabilidades[3].probabilidad}</div>}
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={2} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={3} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={4} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={5} backgroundColor="#ffc72c" riesgos={riesgos} />

                {probabilidades.length > 0 && <div className="center_item">{probabilidades[4].probabilidad}</div>}
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={2} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={3} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={4} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={5} backgroundColor="#ffc72c" riesgos={riesgos} />

                <div></div>
                {impactos.map(i => <div key={i.id} className="center_item">{i.impacto}</div>)}
            </div>


            {(riesgosSeleccionados.length > 0) && <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Impacto</th>
                        <th scope="col">Probabilidad</th>
                        <th scope="col">Respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    {riesgosSeleccionados.map(riesgo => (
                        <tr key={riesgo.id}>
                            <td>{riesgo.id}</td>
                            <td>{riesgo.nombre}</td>
                            <td>{riesgo.impacto.impacto}</td>
                            <td>{riesgo.probabilidad.probabilidad}</td>
                            <td>{riesgo.respuesta.respuesta}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    )
}
