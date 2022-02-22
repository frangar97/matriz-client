import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Impacto } from "./api/Impacto";
import { Probabilidad } from "./api/Probabilidad";
import { Respuesta } from "./api/Respuesta";
import { TipoControl } from "./api/TipoControl";
import { TipoEjecucion } from "./api/TipoEjecucion";
import { Sidebar } from "./components/Sidebar";
import { ControlesPage } from "./pages/ControlesPage";
import { MatrizPage } from "./pages/MatrizPage";
import { RiesgoPage } from "./pages/RiesgoPage";
import { saveImpactos, saveProbabilidades, saveRespuestas, saveTiposControl, saveTiposEjecucion } from "./store";

const App = () => {
  const dispatch = useDispatch();

  const obtenerRespuestas = async () => {
    const request = await Respuesta.list();
    dispatch(saveRespuestas(request));
  }

  const obtenerProbabilidades = async () => {
    const request = await Probabilidad.list();
    dispatch(saveProbabilidades(request));
  }

  const obtenerImpactos = async () => {
    const request = await Impacto.list();
    dispatch(saveImpactos(request));
  }

  const obtenerTiposControl = async () => {
    const request = await TipoControl.list();
    dispatch(saveTiposControl(request));
  }

  const obtenerTipoEjecucion = async () => {
    const request = await TipoEjecucion.list();
    dispatch(saveTiposEjecucion(request));
  }

  useEffect(() => {
    obtenerImpactos();
    obtenerProbabilidades();
    obtenerRespuestas();
    obtenerTiposControl();
    obtenerTipoEjecucion();
  }, [])

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<MatrizPage />} />
          <Route path="/riesgo" element={<RiesgoPage />} />
          <Route path="/control" element={<ControlesPage />} />
        </Routes>
      </div>
    </div>
  );

}
export default App;
