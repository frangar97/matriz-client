import { useEffect, useState } from "react";
import { Box } from "../components/Box"
import { IRiesgo } from "../types/IRiesgo";
import { useSelector } from "react-redux";
import { impactosSelector, probabilidadesSelector } from "../store";
import { Riesgo } from "../api/Riesgo";
import { ModalControles } from "../components/ModalControles";

export const MatrizPage = () => {
    const [riesgos, setRiesgos] = useState<IRiesgo[]>([]);
    const [riesgosSeleccionados, setRiesgosSeleccionados] = useState<IRiesgo[]>([]);
    const [show, setShow] = useState(false);
    const probabilidades = useSelector(probabilidadesSelector);
    const impactos = useSelector(impactosSelector);

    const obtenerRiesgos = async () => {
        try {
            const request = await Riesgo.list();
            setRiesgos(request);
        } catch (err) {

        }
    }

    useEffect(() => {
        obtenerRiesgos();
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <th scope="col">Dueño</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Controles</th>
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
                            <td>{riesgo.owner}</td>
                            <td>{riesgo.costo}</td>
                            <td> <><button className="btn btn-primary" onClick={handleShow}>Mostrar medidas</button> <ModalControles show={show} handleClose={handleClose} riesgo={riesgo} /></>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    )
}
