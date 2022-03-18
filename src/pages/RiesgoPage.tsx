import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { impactosSelector, probabilidadesSelector, respuestasSelector } from "../store";
import { IAddControlRiesgo, ICreateRiesgo, IRiesgo } from "../types/IRiesgo";
import { Riesgo } from "../api/Riesgo";
import { IControl } from "../types/IControl";
import { Control } from "../api/Control";
import { ModalAgregarControles } from "../components/ModalAgregarControl";

export const RiesgoPage = () => {
    const [riesgos, setRiesgos] = useState<IRiesgo[]>([]);
    const [controles, setControles] = useState<IControl[]>([]);
    const [show, setShow] = useState(false);
    const [riesgoId, setRiesgoId] = useState(0);
    const [controlesRiesgo, setcontrolesRiesgo] = useState<IControl[]>([]);
    const { register, handleSubmit } = useForm<ICreateRiesgo>();
    const impactos = useSelector(impactosSelector);
    const probabilidades = useSelector(probabilidadesSelector);
    const respuestas = useSelector(respuestasSelector);

    const obtenerRiesgos = async () => {
        try {
            const request = await Riesgo.list();
            setRiesgos(request);
        } catch (err) {

        }
    }

    const obtenerControles = async () => {
        try {
            const request = await Control.list();
            setControles(request);
        } catch (err) {

        }
    }

    const agregarControles = async (controles: IAddControlRiesgo) => {
        try {
            const request = await Riesgo.addControl(controles);
            const index = riesgos.findIndex(x => x.id === request.id);
            if (index) {
                const copiaRiesgos = [...riesgos];
                copiaRiesgos[index].controles = request.controles
            }

            setShow(false);

            swal({
                title: "Exito",
                text: "Los controles han sido agregados con exito",
                icon: "success"
            })
        } catch (err: any) {
            setShow(false);
            if (err.response) {
                const { data } = err.response;
                swal({
                    title: "Error",
                    text: data.message.join(", "),
                    icon: "error"
                })
            } else {
                swal({
                    title: "Error",
                    text: "Ha ocurrido un error y no se pudo registrar el riesgo",
                    icon: "error"
                })
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = (id: number, controlesRiesgo: IControl[]) => {
        setRiesgoId(id);
        setcontrolesRiesgo(controlesRiesgo);
        setShow(true)
    }

    useEffect(() => {
        obtenerRiesgos();
        obtenerControles();
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
            } else {
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
            <ModalAgregarControles show={show} handleClose={handleClose} controles={controles} agregarControles={agregarControles} riesgoId={riesgoId} controlesRiesgo={controlesRiesgo} />

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
                            <label className="form-label">Dueño</label>
                            <input className="form-control" type="text" {...register("owner")} />
                        </div>

                        <div className="col">
                            <label className="form-label">Costo</label>
                            <input className="form-control" type="text" {...register("costo")} />
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
                        <th scope="col">Dueño</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Controles</th>
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
                            <td>{riesgo.owner}</td>
                            <td>{riesgo.costo}</td>
                            <td><button className="btn btn-primary" onClick={() => handleShow(riesgo.id, riesgo.controles)}>Agregar controles</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
