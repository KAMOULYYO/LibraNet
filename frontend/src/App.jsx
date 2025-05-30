import { BrowserRouter, Routes, Route } from "react-router-dom";
import Consultation from "./components/Consultation";
import Retour from "./components/Retour";
import PaiementAmende from "./components/PaiementAmende";
import Rapport from "./components/Rapport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/retour" element={<Retour />} />
        <Route path="/paiement" element={<PaiementAmende />} />
        <Route path="/rapport" element={<Rapport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
