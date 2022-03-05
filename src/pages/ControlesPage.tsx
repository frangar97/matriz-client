import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { tiposControlSelector, tiposEjecucionSelector } from "../store";
import { IControl, ICreateControl } from "../types/IControl";
import { Control } from "../api/Control";

export const ControlesPage = () => {
    const [controles, setControles] = useState<IControl[]>([]);
    const { register, handleSubmit } = useForm<ICreateControl>();
    const tipoControles = useSelector(tiposControlSelector);
    const tipoEjecuciones = useSelector(tiposEjecucionSelector);

    const obtenerControles = async () => {
        try {
            const request = await Control.list();
            setControles(request);
        } catch (err) {

        }
    }

    useEffect(() => {
        obtenerControles();
    }, [])

    const onSubmit = async (data: ICreateControl) => {
        try {
            const request = await Control.create(data);
            setControles(prev => [...prev, request]);
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
            <h1 className="mt-4 text-center">Panel de controles</h1>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="container mt-5">
                    <div className="row">

                        <div className="col">
                            <label className="form-label">Nombre</label>
                            <input className="form-control" type="text" {...register("nombre")} />
                        </div>

                        <div className="col">
                            <label className="form-label">Tipo Control</label>
                            <select className="form-select" {...register("tipoControlId", { valueAsNumber: true })}>
                                <option value=""></option>
                                {tipoControles.map(p => <option key={p.id} value={p.id}>{p.tipo}</option>)}
                            </select>
                        </div>

                        <div className="col">
                            <label className="form-label">Tipo Ejecución</label>
                            <select className="form-select" {...register("tipoEjecucionId", { valueAsNumber: true })}>
                                <option value=""></option>
                                {tipoEjecuciones.map(p => <option key={p.id} value={p.id}>{p.tipo}</option>)}
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
                        <th scope="col">Tipo Control</th>
                        <th scope="col">Tipo Ejecución</th>
                    </tr>
                </thead>
                <tbody>
                    {controles.map(control => (
                        <tr key={control.id}>
                            <td>{control.id}</td>
                            <td>{control.nombre}</td>
                            <td>{control.tipoControl.tipo}</td>
                            <td>{control.tipoEjecucion.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
