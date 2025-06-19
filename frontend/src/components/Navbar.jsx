// components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("fr");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(payload.role === "admin");
      } catch (e) {
        console.error("Erreur decoding token", e);
      }
    }
  }, [darkMode, location.pathname]); // <-- détecte changement de page

  const t = {
    fr: {
      profile: "Profil",
      logout: "Déconnexion",
      login: "Connexion",
      register: "Inscription",
      dashboard: "Dashboard Admin",
      livres: "Livres",
      panier: "Panier"
    },
    en: {
      profile: "Profile",
      logout: "Logout",
      login: "Login",
      register: "Register",
      dashboard: "Admin Dashboard",
      livres: "Books",
      panier: "Cart"
    }
  }[lang];

  return (
    <nav className="w-full px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          LibraNet
        </Link>

        <div className="flex gap-4 items-center text-sm font-medium">
          <Link to="/livres" className="hover:text-blue-600 dark:hover:text-blue-400">{t.livres}</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-blue-600 dark:hover:text-blue-400">{t.profile}</Link>
              <Link to="/panier" className="hover:text-blue-600 dark:hover:text-blue-400">{t.panier}</Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-blue-600 dark:hover:text-blue-400">{t.dashboard}</Link>
              )}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                  window.location.reload();
                }}
                className="hover:text-red-500 transition"
              >
                {t.logout}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400">{t.login}</Link>
              <Link to="/register" className="hover:text-blue-600 dark:hover:text-blue-400">{t.register}</Link>
            </>
          )}

          <button onClick={() => setDarkMode(!darkMode)} className="p-1 bg-white/50 dark:bg-gray-800 rounded-full">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}>
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </div>
    </nav>
  );
}
