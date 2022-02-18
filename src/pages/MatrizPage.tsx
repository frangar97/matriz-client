import { useEffect, useState } from "react";
import { Box } from "../components/Box"
import axios from 'axios';

export const MatrizPage = () => {
    const [riesgos, setRiesgos] = useState<any[]>([]);
    const [riesgosSeleccionados, setRiesgosSeleccionados] = useState<any[]>([]);

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
            <h1>Pagina Matriz</h1>

            <div className="wrapper">
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={1} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={2} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={3} backgroundColor="tomato" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={4} backgroundColor="tomato" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={5} impacto={5} backgroundColor="tomato" riesgos={riesgos} />

                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={2} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={3} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={4} backgroundColor="tomato" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={4} impacto={5} backgroundColor="tomato" riesgos={riesgos} />

                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={2} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={3} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={4} backgroundColor="#ffc72c" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={3} impacto={5} backgroundColor="tomato" riesgos={riesgos} />

                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={2} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={3} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={4} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={2} impacto={5} backgroundColor="#ffc72c" riesgos={riesgos} />

                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={1} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={2} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={3} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={4} backgroundColor="#009645" riesgos={riesgos} />
                <Box setRiesgos={setRiesgosSeleccionados} probabilidad={1} impacto={5} backgroundColor="#ffc72c" riesgos={riesgos} />
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
