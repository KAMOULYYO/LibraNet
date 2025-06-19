import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Sparkles, Eye, EyeOff, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import api from '../api';

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("fr");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMessage("");
  setSuccess(false);

  try {
    const res = await api.post("/auth/login", {
      email,
      mot_de_passe,
    });

    setSuccess(true);
    localStorage.setItem("token", res.data.access_token);
    setTimeout(() => navigate("/livres"), 1000);
  } catch (err) {
    console.log(err.response?.data);
    setErrorMessage(lang === "fr" ? "Identifiants incorrects" : "Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#e4e9f7] to-[#dde6f3] dark:from-gray-900 dark:to-gray-800 px-4 overflow-hidden">
      <nav className="w-full px-6 py-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md fixed top-0 z-50 shadow-md border-b border-white/10 dark:border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
          <BookOpen /> LibraNet
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white/60 dark:bg-gray-800 hover:scale-105 transition">
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={toggleLang} className="p-2 rounded-full bg-white/60 dark:bg-gray-800 hover:scale-105 transition">
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </nav>

      <Sparkles className="absolute top-10 left-10 text-blue-200 dark:text-gray-700 animate-pulse" size={40} />
      <Sparkles className="absolute bottom-10 right-10 text-blue-200 dark:text-gray-700 animate-spin-slow" size={40} />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-md border dark:border-gray-700 border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-2">
          🔐 {lang === "fr" ? "Connexion" : "Login"}
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 italic mb-4">
          {lang === "fr" ? `"Lire, c’est voyager sans bouger."` : `"Reading is traveling without moving."`}
        </p>

        {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-4">{lang === "fr" ? "Connexion réussie ✅" : "Login successful ✅"}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === "fr" ? "Adresse e-mail" : "Email address"}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="mot_de_passe"
              value={mot_de_passe}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder={lang === "fr" ? "Mot de passe" : "Password"}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              aria-label="Afficher/Masquer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all"
          >
            {loading ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              lang === "fr" ? "Se connecter 🔓" : "Login 🔓"
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          {lang === "fr" ? "Vous n’avez pas encore de compte ?" : "Don’t have an account yet?"}{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            {lang === "fr" ? "Créer un compte" : "Create one"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
