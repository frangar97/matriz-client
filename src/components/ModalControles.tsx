import { useEffect, FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { IRiesgo } from "../types/IRiesgo";

type Props = {
    handleClose: () => void
    show: boolean
    riesgo: IRiesgo
}

const impactos = ["Critico", "Mayor", "Catastrofico"];

const generarPlanSeguridad = (riesgo: string): string => {
    if (riesgo.includes("USB infectadas")) {
        return "Ejecutar escaneo de memoria usb en busca de archivos maliciosos.";
    }

    if (riesgo.includes("Ataques a la red")) {
        return "Monitorización continua y respuesta inmediata al ataque.";
    }

    if (riesgo.includes("equipo no autorizado")) {
        return "Bloqueo de ip del dispositivo y desconexión inmediata.";
    }

    if (riesgo.includes("personal no autorizado")) {
        return "Revisión de identificación para validación y saber que cuenta con los permisos requeridos para ingresar a la instalación.";
    }

    if (riesgo.includes("datos sensibles")) {
        return "Realizar backups de seguridad de la información.";
    }

    if (riesgo.includes("programas maliciosos")) {
        return "Configurar roles en el dispositivo para que solo personal con roles requeridos pueda instalar software.";
    }

    return "";
}

const generarPlanContingencia = (riesgo: string): string => {
    if (riesgo.includes("USB infectadas")) {
        return "Realizar respaldo de información del equipo en caso de encontrar virus.";
    }

    if (riesgo.includes("Ataques a la red")) {
        return "Realizar respaldos de seguridad y proteccion de correo electronicos.";
    }

    if (riesgo.includes("equipo no autorizado")) {
        return "Bloqueo de ip del dispositivo y desconexión inmediata.";
    }

    if (riesgo.includes("datos sensibles")) {
        return "Utilizar ultima copia de seguridad almacenada.";
    }

    if (riesgo.includes("personal no autorizado")) {
        return "Retiro de la persona de las instalaciones y verificar el estado de los equipos e información de la organización.";
    }

    if (riesgo.includes("programas maliciosos")) {
        return "Realizar backups de seguridad de la información y colocar el programa en una blacklist para evitar futuras instalaciones.";
    }

    return "";
}

export const ModalControles: FC<Props> = ({ handleClose, show, riesgo }) => {
    const [politica, setPolitica] = useState("");
    const [planSeguridad, setPlanSeguridad] = useState("");
    const [planContingencia, setplanContingencia] = useState("");

    useEffect(() => {
        let politicaGenerada = `Se recomienda ${riesgo.respuesta.respuesta} el riesgo de ${riesgo.nombre} ya que el impacto es ${riesgo.impacto.impacto}`;

        if (impactos.includes(riesgo.impacto.impacto)) {
            politicaGenerada = politicaGenerada + ` y el costo es de ${riesgo.costo}`
        }

        setPolitica(politicaGenerada);

        setPlanSeguridad(generarPlanSeguridad(riesgo.nombre));
        setplanContingencia(generarPlanContingencia(riesgo.nombre));

        if (riesgo.respuesta.respuesta === "Aceptar") {
            setPlanSeguridad("La empresa decidio aceptar el riesgo por lo tanto no hay plan de seguridad.");
        }
    }, [riesgo]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Medidas Generadas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div>
                            <h4>Politica de seguridad</h4>
                            <p>{politica}</p>
                        </div>

                        <div>
                            <h4>Plan de contingencia</h4>
                            <p>{planContingencia}</p>
                        </div>

                        <div>
                            <h4>Plan de seguridad</h4>
                            <p>{planSeguridad}</p>
                            {(riesgo.controles.length > 0 && riesgo.respuesta.respuesta !== "Aceptar") && <><h6>Medidas para disminuir el riesgo</h6><ul>{riesgo.controles.map(e => <li key={e.id}>{e.nombre}</li>)}</ul></>}
                        </div>
                    </>
                </Modal.Body>
            </Modal>
        </>)
}