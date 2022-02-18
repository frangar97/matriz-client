import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ControlesPage } from "./pages/ControlesPage";
import { MatrizPage } from "./pages/MatrizPage";
import { RiesgoPage } from "./pages/RiesgoPage";

const App = () => {

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
