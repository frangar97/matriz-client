import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { IControl } from "../types/IControl";

type Props = {
    handleClose: () => void
    show: boolean
    controles: IControl[]
}

export const ModalControles: FC<Props> = ({ handleClose, show, controles }) => {

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
                </Modal.Body>
            </Modal>
        </>)
}