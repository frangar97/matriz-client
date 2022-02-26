import { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { IControl } from "../types/IControl";
import { IAddControlRiesgo } from "../types/IRiesgo";

type Props = {
    handleClose: () => void
    show: boolean
    controles: IControl[],
    riesgoId: number,
    agregarControles: (controles: IAddControlRiesgo) => void
    controlesRiesgo: IControl[]
}

export const ModalAgregarControles: FC<Props> = ({ handleClose, show, controles, agregarControles, riesgoId, controlesRiesgo }) => {
    const [agregados, setAgregados] = useState<number[]>([]);

    const enviarControlesSeleccionados = async () => {
        agregarControles({ riesgoId, controlesId: [...new Set(agregados)] });
    }

    const existeControl = (id: number): boolean => {
        const existe = controlesRiesgo.find(x => x.id === id);
        return existe !== undefined;
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Controles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Agregar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {controles.map(control => (
                                <tr key={control.id}>
                                    <td>{control.nombre}</td>
                                    <td>
                                        {existeControl(control.id) ? <p>Agregado</p> : <input className="form-check-input" type="checkbox" id="controlId" name="controlId" onChange={() => setAgregados(prev => [...prev, control.id])} value={control.id} />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={enviarControlesSeleccionados}>Agregar controles</button>
                </Modal.Footer>
            </Modal>
        </>)
}