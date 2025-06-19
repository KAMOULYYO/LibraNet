import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Sparkles, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import api from '../api';

export default function Register() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("fr");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const t = {
    fr: {
      title: "🚀 Rejoignez LibraNet",
      lastname: "Nom",
      firstname: "Prénom",
      email: "Adresse e-mail",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      submit: "Créer un compte ✨",
      loginText: "Déjà inscrit ?",
      loginLink: "Se connecter",
      success: "Inscription réussie ✅",
      errorMatch: "Les mots de passe ne correspondent pas",
      errorServer: "Erreur lors de l'inscription. Veuillez réessayer."
    },
    en: {
      title: "🚀 Join LibraNet",
      lastname: "Last name",
      firstname: "First name",
      email: "Email address",
      password: "Password",
      confirmPassword: "Confirm password",
      submit: "Create account ✨",
      loginText: "Already registered?",
      loginLink: "Log in",
      success: "Registration successful ✅",
      errorMatch: "Passwords do not match",
      errorServer: "Registration failed. Please try again."
    }
  }[lang];

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess(false);

  const form = e.target;
  const nom = form.nom.value;
  const prenom = form.prenom.value;
  const email = form.email.value;
  const mot_de_passe = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (mot_de_passe !== confirmPassword) {
    setError(t.errorMatch);
    return;
  }

  try {
    await api.post("/auth/signup", {
      nom,
      prenom,
      email,
      mot_de_passe
    });
    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    setError(t.errorServer);
  }
};

  return (
    <>
      {/* Navbar */}
      <nav className="w-full px-6 py-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md fixed top-0 z-50 shadow-md border-b border-white/10 dark:border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
          <BookOpen /> LibraNet
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/60 dark:bg-gray-800 hover:scale-105 transition"
            title={darkMode ? "Mode clair" : "Mode sombre"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            onClick={toggleLang}
            className="p-2 rounded-full bg-white/60 dark:bg-gray-800 hover:scale-105 transition"
            title="Changer de langue"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </nav>

      {/* Formulaire */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e4e9f7] to-[#dde6f3] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center overflow-hidden px-4 pt-24">
        <Sparkles className="absolute top-10 left-10 text-blue-200 dark:text-gray-700 animate-pulse" size={40} />
        <Sparkles className="absolute bottom-10 right-10 text-blue-200 dark:text-gray-700 animate-spin-slow" size={40} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-md border dark:border-gray-700 border-gray-200"
        >
          <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-6">{t.title}</h2>

          {success && <p className="text-green-500 text-sm text-center mb-4">{t.success}</p>}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="nom"
                placeholder={t.lastname}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="prenom"
                placeholder={t.firstname}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder={t.email}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder={t.password}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder={t.confirmPassword}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all"
            >
              {t.submit}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            {t.loginText}{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              {t.loginLink}
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
