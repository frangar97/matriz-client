import { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";

export const RiesgoPage = () => {
    const { register, handleSubmit } = useForm();
    const [riesgos, setRiesgos] = useState<any[]>([]);
    const [probabilidades, setProbabilidades] = useState<any[]>([]);
    const [respuestas, setRespuestas] = useState<any[]>([]);
    const [impactos, setImpactos] = useState<any[]>([]);

    const obtenerRiesgos = async () => {
        try {
            const request = await axios.get("http://localhost:3001/api/riesgo");
            setRiesgos(request.data);
        } catch (err) {

        }
    }

    const obtenerProbabilidades = async () => {
        try {
            const request = await axios.get("http://localhost:3001/api/probabilidad");
            setProbabilidades(request.data);
        } catch (err) {

        }
    }

    const obtenerRespuestas = async () => {
        try {
            const request = await axios.get("http://localhost:3001/api/respuesta");
            setRespuestas(request.data);
        } catch (err) {

        }
    }

    const obtenerImpactos = async () => {
        try {
            const request = await axios.get("http://localhost:3001/api/impacto");
            setImpactos(request.data);
        } catch (err) {

        }
    }

    useEffect(() => {
        obtenerRiesgos();
        obtenerProbabilidades();
        obtenerRespuestas();
        obtenerImpactos();
    }, [])

    const onSubmit = async (e: any) => {
        try {
            const request = await axios.post("http://localhost:3001/api/riesgo", e, { headers: { "Content-type": "application/json" } });
            setRiesgos(prev => [...prev, request.data]);
        } catch (err:any) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <h1 className="mt-4 text-center">Panel del riesgo</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mt-5">
                    <div className="row">

                        <div className="col">
                            <label className="form-label">Nombre</label>
                            <input className="form-control" type="text" {...register("nombre")} />
                        </div>

                        <div className="col">
                            <label className="form-label">Impacto</label>
                            <select className="form-select" {...register("impactoId", { valueAsNumber: true })}>
                                {impactos.map(p => <option key={p.id} value={p.id}>{p.impacto}</option>)}
                            </select>
                        </div>

                        <div className="col">
                            <label className="form-label">Probabilidad</label>
                            <select className="form-select" {...register("probabilidadId", { valueAsNumber: true })}>
                                {probabilidades.map(p => <option key={p.id} value={p.id}>{p.probabilidad}</option>)}
                            </select>
                        </div>

                        <div className="col">
                            <label className="form-label">Respuesta</label>
                            <select className="form-select" {...register("respuestaId", { valueAsNumber: true })}>
                                {respuestas.map(p => <option key={p.id} value={p.id}>{p.respuesta}</option>)}
                            </select>
                        </div>

                        <div className="col">
                            <input type="submit" value="Crear" className="btn btn-success mt-4" />
                        </div>
                    </div>
                </div>
            </form>

            <table className="table mt-5">
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
                    {riesgos.map(riesgo => (
                        <tr key={riesgo.id}>
                            <td>{riesgo.id}</td>
                            <td>{riesgo.nombre}</td>
                            <td>{riesgo.impacto.impacto}</td>
                            <td>{riesgo.probabilidad.probabilidad}</td>
                            <td>{riesgo.respuesta.respuesta}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
