import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10 text-sm text-gray-600 dark:text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1">
            <BookOpen /> LibraNet
          </h4>
          <p>Votre bibliothèque numérique intelligente.</p>
        </div>

        <div>
          <h4 className="font-bold mb-2">Navigation</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Accueil</Link></li>
            <li><Link to="/livres" className="hover:underline">Livres</Link></li>
            <li><Link to="/panier" className="hover:underline">Panier</Link></li>
            <li><Link to="/login" className="hover:underline">Connexion</Link></li>
            <li><Link to="/register" className="hover:underline">Inscription</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Contact</h4>
          <p>Email : contact@libranet.ca</p>
          <p>Téléphone : +1 514 123 4567</p>
        </div>
      </div>

      <div className="text-center mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
        © {new Date().getFullYear()} LibraNet — Tous droits réservés.
      </div>
    </footer>
  );
}
