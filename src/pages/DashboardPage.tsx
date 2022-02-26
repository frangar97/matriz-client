import { FC, useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Riesgo } from "../api/Riesgo";
import { IRiesgo } from "../types/IRiesgo";

export const DashboardPage = () => {
    const [riesgos, setRiesgos] = useState<IRiesgo[]>([]);

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

    return (
        <div>
            <h1 className="text-center mt-2">Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }} className="mt-5">
                <div style={{ width: 400, height: 400 }}>
                    <PieChartControles riesgos={riesgos} />
                </div>
                <div style={{ width: 400, height: 400 }}>
                    <PieChartRiesgos riesgos={riesgos} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly',marginTop:"150px" }}>
                <div style={{ width: 400, height: 400 }}>
                    <PieChartImpacto riesgos={riesgos} />
                </div>
            </div>
        </div>
    )
}

const PieChartControles: FC<{ riesgos: IRiesgo[] }> = ({ riesgos }) => {
    const [controlados, setControlados] = useState<number>(0);
    const [sinControl, setsinControl] = useState<number>(0);

    useEffect(() => {
        const con = riesgos.filter(x => x.controles.length > 0);
        const sin = riesgos.filter(x => x.controles.length === 0);

        setControlados(con.length);
        setsinControl(sin.length);
    }, [riesgos]);

    if (riesgos.length === 0) return <h3>No hay riesgos para mostrar</h3>

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Riesgos controlados</h3>
            <Doughnut
                options={{ maintainAspectRatio: false, plugins: { legend: { display: true, labels: { color: "#fff" } } } }}
                data={{
                    labels: ["Controladas", "No controladas"],
                    datasets: [{
                        hoverOffset: 4,
                        label: "Control de riesgos",
                        data: [controlados, sinControl],
                        backgroundColor: ['green', 'tomato']
                    }]
                }}
                height={500}
                width={200}
            />

            <ul style={{ listStyle: "none" }}>
                <li style={{ width: "150px", backgroundColor: "green", color: "white", fontWeight: "bold", textAlign: 'center' }}>Controlados  {controlados}</li>
                <li style={{ width: "150px", backgroundColor: "tomato", color: "white", fontWeight: "bold", textAlign: 'center' }}>Sin Control {sinControl}</li>

            </ul>
        </>
    )
}

const PieChartRiesgos: FC<{ riesgos: IRiesgo[] }> = ({ riesgos }) => {
    const [constante, setConstante] = useState<number>(0);
    const [moderado, setModerado] = useState<number>(0);
    const [ocasional, setOcasional] = useState<number>(0);
    const [posible, setPosible] = useState<number>(0);
    const [improbable, setImprobable] = useState<number>(0);


    useEffect(() => {
        const con = riesgos.filter(x => x.probabilidad.orden === 1);
        const mo = riesgos.filter(x => x.probabilidad.orden === 2);
        const oc = riesgos.filter(x => x.probabilidad.orden === 3);
        const po = riesgos.filter(x => x.probabilidad.orden === 4);
        const im = riesgos.filter(x => x.probabilidad.orden === 5);

        setConstante(con.length);
        setModerado(mo.length);
        setOcasional(oc.length);
        setPosible(po.length);
        setImprobable(im.length);
    }, [riesgos]);

    if (riesgos.length === 0) return <h3>No hay riesgos para mostrar</h3>

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Probabilidad de los riesgos</h3>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Pie
                    data={{
                        labels: ["Constante", "Moderado", "Ocasional", "Posible", "Improbable"],
                        datasets: [{
                            hoverOffset: 4,
                            label: "Control de riesgos",
                            data: [constante, moderado, ocasional, posible, improbable],
                            backgroundColor: ['tomato', 'orange', 'brown', 'steelblue', 'green']
                        }]
                    }}
                    height={500}
                    width={200}
                />

                <ul style={{ listStyle: "none" }}>
                    <li style={{ width: "150px", backgroundColor: "tomato", color: "white", fontWeight: "bold", textAlign: 'center' }}>constante  {constante}</li>
                    <li style={{ width: "150px", backgroundColor: "orange", color: "white", fontWeight: "bold", textAlign: 'center' }}>moderado {moderado}</li>
                    <li style={{ width: "150px", backgroundColor: "brown", color: "white", fontWeight: "bold", textAlign: 'center' }}>ocasional {ocasional}</li>
                    <li style={{ width: "150px", backgroundColor: "steelblue", color: "white", fontWeight: "bold", textAlign: 'center' }}>posible {posible}</li>
                    <li style={{ width: "150px", backgroundColor: "green", color: "white", fontWeight: "bold", textAlign: 'center' }}>improbable {improbable}</li>
                </ul>
            </div>
        </>
    )
}

const PieChartImpacto: FC<{ riesgos: IRiesgo[] }> = ({ riesgos }) => {
    const [constante, setConstante] = useState<number>(0);
    const [moderado, setModerado] = useState<number>(0);
    const [ocasional, setOcasional] = useState<number>(0);
    const [posible, setPosible] = useState<number>(0);
    const [improbable, setImprobable] = useState<number>(0);


    useEffect(() => {
        const con = riesgos.filter(x => x.impacto.orden === 1);
        const mo = riesgos.filter(x => x.impacto.orden === 2);
        const oc = riesgos.filter(x => x.impacto.orden === 3);
        const po = riesgos.filter(x => x.impacto.orden === 4);
        const im = riesgos.filter(x => x.impacto.orden === 5);

        setConstante(con.length);
        setModerado(mo.length);
        setOcasional(oc.length);
        setPosible(po.length);
        setImprobable(im.length);
    }, [riesgos]);

    if (riesgos.length === 0) return <h3>No hay riesgos para mostrar</h3>

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Impacto de los riesgos</h3>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Pie
                    data={{
                        labels: ["Constante", "Moderado", "Ocasional", "Posible", "Improbable"],
                        datasets: [{
                            hoverOffset: 4,
                            label: "Control de riesgos",
                            data: [constante, moderado, ocasional, posible, improbable],
                            backgroundColor: ['tomato', 'orange', 'brown', 'steelblue', 'green']
                        }]
                    }}
                    height={500}
                    width={200}
                />

                <ul style={{ listStyle: "none" }}>
                    <li style={{ width: "150px", backgroundColor: "tomato", color: "white", fontWeight: "bold", textAlign: 'center' }}>insignificante  {constante}</li>
                    <li style={{ width: "150px", backgroundColor: "orange", color: "white", fontWeight: "bold", textAlign: 'center' }}>menor {moderado}</li>
                    <li style={{ width: "150px", backgroundColor: "brown", color: "white", fontWeight: "bold", textAlign: 'center' }}>critico {ocasional}</li>
                    <li style={{ width: "150px", backgroundColor: "steelblue", color: "white", fontWeight: "bold", textAlign: 'center' }}>mayor {posible}</li>
                    <li style={{ width: "150px", backgroundColor: "green", color: "white", fontWeight: "bold", textAlign: 'center' }}>catastrofico {improbable}</li>
                </ul>
            </div>
        </>
    )
}