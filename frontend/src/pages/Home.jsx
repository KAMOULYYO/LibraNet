
// Home.jsx complet avec icônes Lucide à la place des emojis
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// EN HAUT DU FICHIER
import { Rocket } from "lucide-react"; // ✅ Ajout manquant

import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  Search,
  MessageCircle,
  Users,
  Star,
  Brain,
  Target,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Video,
  Sun,
  Moon,
} from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const [lang, setLang] = useState("fr");
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    AOS.init({ duration: 1000 });
   const token = localStorage.getItem("token");
setIsAuthenticated(!!token);

if (token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role === "admin") {
      setIsAdmin(true);
    }
  } catch (err) {
    console.error("Erreur lors du décodage du token :", err);
  }
}


    
  }, [darkMode]);

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const t = {
    fr: {
      connect: "Connexion",
      register: "Inscription",
      profile: "Profil",
      logout: "Déconnexion",
      searchPlaceholder: "Rechercher un livre, un auteur, un thème...",
      testimonials: "Témoignages",
      getStarted: "Nous rejoindre",
      why: "Pourquoi LibraNet ?",
      explore: "Explorer les livres maintenant",
      news: "Nouveautés",
      features: "Fonctionnalités Populaires",
      goals: "Nos Objectifs",
      events: "Événements à venir",
      books: "Livres Populaires",
      dashboard: "Dashboard Admin"
    },
    en: {

      connect: "Login",
      register: "Register",
      profile: "Profile",
      logout: "Logout",
      searchPlaceholder: "Search for a book, author, or topic...",
      testimonials: "Testimonials",
      getStarted: "Join Us",
      why: "Why LibraNet?",
      explore: "Explore Books Now",
      news: "What's New",
      features: "Popular Features",
      goals: "Our Goals",
      events: "Upcoming Events",
      books: "Popular Books",
      dashboard: "Admin Dashboard",
    }
  }[lang];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "#00000000" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 80, duration: 0.4 } }
          },
          particles: {
            color: { value: "#60a5fa" },
            links: { enable: true, color: "#60a5fa", distance: 120 },
            move: { enable: true, speed: 1 },
            number: { value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } }
          }
        }}
      />




{/* HERO */}
<section className="relative pt-36 pb-40 z-10 bg-cover bg-center min-h-[100vh]" style={{ backgroundImage: "url('/images/img3.jpg')" }}>
  <div className="absolute inset-0 bg-white/80 dark:bg-black/60"></div>
  <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
    
    {/* Titre animé avec Typewriter */}
    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 animate-fade-in-up">
      <Typewriter
        words={[
          "Explorez l’univers des livres",
          "Découvrez. Apprenez. Partagez.",
          "La lecture intelligente commence ici."
        ]}
        loop={true}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={2000}
      />
    </h1>

    {/* Slogan */}
    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
      Une bibliothèque intelligente pour enrichir votre savoir, où que vous soyez.
    </p>

    {/* Champ de recherche */}
    <div className="flex items-center backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/50 dark:border-gray-700 px-6 py-4 rounded-full shadow-lg max-w-xl mx-auto transition-all hover:shadow-xl">
      <Search size={20} className="text-gray-600 dark:text-gray-300 mr-2" />
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
    </div>

    {/* Bouton inscription */}
<Link
  to="/register"
  className="mt-10 w-fit mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-all text-base font-semibold animate-bounce flex items-center gap-2 justify-center"
>
  {t.getStarted} <Rocket className="w-5 h-5" />
</Link>


    {/* Compteur animé */}
    <div className="mt-6 text-lg text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
      <BookOpen className="w-5 h-5" />
      <CountUp end={12450} duration={3} separator=" " /> livres disponibles
    </div>

    {/* Icônes interactives */}
    <div className="mt-10 flex justify-center gap-6 flex-wrap" data-aos="fade-up">
      {/* Lire un extrait */}
      <div className="relative group">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer">
          <BookOpen className="w-6 h-6" />
        </div>
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Lire un extrait
        </span>
      </div>

      {/* Lancer démo vidéo */}
      <div className="relative group">
        <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer">
          <Video className="w-6 h-6" />
        </div>
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Démo vidéo
        </span>
      </div>

      {/* Suggestions IA */}
      <div className="relative group">
        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer">
          <Brain className="w-6 h-6" />
        </div>
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Suggestions IA
        </span>
      </div>

      {/* Recherche avancée */}
      <div className="relative group">
        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer">
          <Search className="w-6 h-6" />
        </div>
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Recherche filtrée
        </span>
      </div>
    </div>
  </div>
</section>



      {/* FEATURES */}
      <SectionTitle text={t.features} />
      <FeatureGrid />

      {/* NEWS */}
      <SectionTitle text={t.news} />
      <NewsGrid />

      {/* GOALS */}
      <SectionTitle text={t.goals} />
      <GoalsGrid />

      {/* EVENTS */}
      <SectionTitle text={t.events} />
      <EventsGrid />


<div className="relative px-6 py-10" data-aos="fade-up">
  {/* Bouton gauche */}
  <button
    onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition"
    aria-label="Scroll Left"
  >
    <ChevronLeft className="w-5 h-5" />
  </button>

 
  {/* Liste des livres */}
  <div
    ref={scrollRef}
    className="overflow-x-auto scrollbar-hide flex gap-6 px-10"
    style={{ scrollBehavior: "smooth" }}
  >
    {["book1.avif", "book2.jpg","book2.jpg","book2.jpg", "book3.jpg", "book4.jpg", "book5.jpg"].map((src, idx) => (
      <motion.div
        whileHover={{ scale: 1.05 }}
        key={idx}
        className="flex-none w-60 h-80 rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800"
      >
        <img
          src={`/books/${src}`}
          alt={`Book ${idx + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>
    ))}
  </div>

  {/* Bouton droite */}
  <button
    onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition"
    aria-label="Scroll Right"
  >
    <ChevronRight className="w-5 h-5" />
  </button>
</div>

 {/* CATÉGORIES POPULAIRES */}
<SectionTitle text={lang === "fr" ? "📚 Catégories Populaires" : "📚 Popular Categories"} />

<div className="flex flex-wrap justify-center gap-4 px-6 py-10" data-aos="fade-up">
  {[
    "Romans",
    "Développement personnel",
    "Technologie",
    "Science",
    "Santé",
    "Histoire",
    "Jeunesse",
    "Psychologie",
  ].map((category, index) => (
    <motion.button
      key={index}
      whileHover={{ scale: 1.05 }}
      className="px-5 py-2 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white rounded-full font-medium shadow hover:bg-blue-200 dark:hover:bg-gray-700 transition"
    >
      {category}
    </motion.button>
  ))}
</div>

{/* STATISTIQUES EN DIRECT */}
<SectionTitle text={lang === "fr" ? "📊 Statistiques en direct" : "📊 Live Stats"} />

<div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 py-10 text-center" data-aos="fade-up">
  {[
    { labelFr: "Livres disponibles", labelEn: "Books Available", end: 12450 },
    { labelFr: "Utilisateurs actifs", labelEn: "Active Users", end: 8760 },
    { labelFr: "Auteurs référencés", labelEn: "Listed Authors", end: 540 },
    { labelFr: "Recherches par jour", labelEn: "Daily Searches", end: 3200 },
  ].map((item, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h4 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
        <CountUp end={item.end} duration={2} separator="," />
      </h4>
      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
        {lang === "fr" ? item.labelFr : item.labelEn}
      </p>
    </motion.div>
  ))}
</div>



      {/* TESTIMONIALS */}
      <SectionTitle text={t.testimonials} />
      <TestimonialGrid />

      {/* FOOTER */}
   
    </div>
  );
}

const SectionTitle = ({ text, icon: Icon }) => (
  <h2 className="text-3xl font-bold text-center my-14 text-blue-600 dark:text-blue-400 flex justify-center items-center gap-2" data-aos="fade-up">
    {Icon && <Icon className="w-6 h-6" />} {text}
  </h2>
);

const FeatureGrid = () => (
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6" data-aos="fade-up">
    <Feature icon={<Search size={36} className="text-blue-600 mb-4 mx-auto animate-pulse" />} title="Recherche Intelligente" desc="Trouvez vos livres avec des filtres précis et rapides." />
    <Feature icon={<Brain size={36} className="text-purple-600 mb-4 mx-auto animate-spin-slow" />} title="Recommandation IA" desc="Des livres choisis selon vos goûts et lectures passées." />
    <Feature icon={<Users size={36} className="text-green-600 mb-4 mx-auto animate-bounce" />} title="Communauté" desc="Partagez vos avis et participez à des clubs de lecture." />
  </div>
);

const NewsGrid = () => (
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6" data-aos="fade-up">
    <NewsCard title="LibraNet Premium" desc="Accès illimité aux livres rares et outils IA." />
    <NewsCard title="Partenariat UQAM" desc="Accès aux ressources universitaires." />
    <NewsCard title="IA de Résumé" desc="Résumé automatique de vos lectures." />
  </div>
);

const GoalsGrid = () => (
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6" data-aos="fade-up">
    <Feature icon={<Target size={36} className="text-red-500 mb-4 mx-auto animate-pulse" />} title="Vision" desc="Offrir l’accès au savoir pour tous, partout." />
    <Feature icon={<Star size={36} className="text-yellow-500 mb-4 mx-auto animate-ping" />} title="Qualité" desc="Mettre en avant des ouvrages vérifiés, bien classés." />
    <Feature icon={<Users size={36} className="text-green-500 mb-4 mx-auto animate-bounce" />} title="Inclusion" desc="Encourager la diversité culturelle dans les lectures." />
  </div>
);

const EventsGrid = () => (
  <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6" data-aos="fade-up">
    <NewsCard title="Webinaire : L’IA et les livres" desc="Rejoignez-nous pour discuter de l’impact de l’IA sur la lecture (15 juin)." />
    <NewsCard title="Concours Lecture Été" desc="Gagnez des cartes cadeaux en lisant des livres recommandés (1er juillet)." />
  </div>
);

const TestimonialGrid = () => (
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6" data-aos="fade-up">
    <TestimonialCard name="Sarah" feedback="Recherche rapide, design parfait, j'adore !" />
    <TestimonialCard name="Ali" feedback="Les suggestions IA sont très pertinentes. Super boulot !" />
    <TestimonialCard name="Julie" feedback="Facile à utiliser, et très moderne. Bravo à l’équipe LibraNet !" />
  </div>
);

const Feature = ({ icon, title, desc }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
    {icon}
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400">{desc}</p>
  </motion.div>
);

const NewsCard = ({ title, desc }) => (
  <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);

const TestimonialCard = ({ name, feedback }) => (
  <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm text-center">
    <MessageCircle size={32} className="text-blue-400 mb-4 mx-auto" />
    <p className="text-gray-700 dark:text-gray-300 italic mb-3">“{feedback}”</p>
    <p className="font-semibold text-gray-800 dark:text-white">– {name}</p>
  </motion.div>
);
