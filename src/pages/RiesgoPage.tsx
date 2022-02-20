import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { globalSelector } from "../store";
import { ICreateRiesgo, IRiesgo } from "../types/IRiesgo";
import { Riesgo } from "../api/Riesgo";

export const RiesgoPage = () => {
    const [riesgos, setRiesgos] = useState<IRiesgo[]>([]);
    const { register, handleSubmit } = useForm<ICreateRiesgo>();
    const impactos = useSelector(globalSelector).impactos;
    const probabilidades = useSelector(globalSelector).probabilidades;
    const respuestas = useSelector(globalSelector).respuestas;

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

    const onSubmit = async (data: ICreateRiesgo) => {
        try {
            const request = await Riesgo.create(data);
            setRiesgos(prev => [...prev, request]);
        } catch (err: any) {
            if (err.response) {
                const { data } = err.response;
                swal({
                    title: "Error",
                    text: data.message.join(", "),
                    icon: "error"
                })
            }else{
                swal({
                    title: "Error",
                    text: "Ha ocurrido un error y no se pudo registrar el riesgo",
                    icon: "error"
                })
            }
        }
    }

    return (
        <div>
            <h1 className="mt-4 text-center">Panel del riesgo</h1>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="container mt-5">
                    <div className="row">

                        <div className="col">
                            <label className="form-label">Nombre</label>
                            <input className="form-control" type="text" {...register("nombre")} />
                        </div>

                        <div className="col">
                            <label className="form-label">Impacto</label>
                            <select className="form-select" {...register("impactoId", { valueAsNumber: true })}>
                                <option value=""></option>
                                {impactos.map(p => <option key={p.id} value={p.id}>{p.impacto}</option>)}
                            </select>
                        </div>

                        <div className="col">
                            <label className="form-label">Probabilidad</label>
                            <select className="form-select" {...register("probabilidadId", { valueAsNumber: true })}>
                                <option value=""></option>
                                {probabilidades.map(p => <option key={p.id} value={p.id}>{p.probabilidad}</option>)}
                            </select>
                        </div>

                        <div className="col">
                            <label className="form-label">Respuesta</label>
                            <select className="form-select" {...register("respuestaId", { valueAsNumber: true })}>
                                <option value=""></option>
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
