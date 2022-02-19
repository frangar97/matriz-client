import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Impacto } from "./api/Impacto";
import { Probabilidad } from "./api/Probabilidad";
import { Respuesta } from "./api/Respuesta";
import { Sidebar } from "./components/Sidebar";
import { ControlesPage } from "./pages/ControlesPage";
import { MatrizPage } from "./pages/MatrizPage";
import { RiesgoPage } from "./pages/RiesgoPage";
import { saveImpactos, saveProbabilidades, saveRespuestas } from "./store";

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

  useEffect(() => {
    obtenerImpactos();
    obtenerProbabilidades();
    obtenerRespuestas();
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
