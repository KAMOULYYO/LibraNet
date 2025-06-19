import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import AdminDashboard from "./pages/AdminDashboard";
import ListeUtilisateurs from "./pages/ListeUtilisateurs";
import AjouterLivre from "./pages/AjouterLivre";
import Livres from "./pages/Livres";
import Panier from "./pages/Panier";
import EditBook from "./pages/EditBook";
import ListeLivres from "./pages/ListeLivres";

// Composants globaux
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-gray-900">
            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Routes admin imbriquées */}
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route path="users" element={<ListeUtilisateurs />} />
                  <Route path="add-book" element={<AjouterLivre />} />
                 <Route path="edit-book/:id" element={<EditBook />} />

                    <Route path="livres" element={<ListeLivres />} />
                </Route>

                {/* Routes sécurisées */}
                <Route
                  path="/livres"
                  element={
                    <PrivateRoute>
                      <Livres />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/panier"
                  element={
                    <PrivateRoute>
                      <Panier />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
