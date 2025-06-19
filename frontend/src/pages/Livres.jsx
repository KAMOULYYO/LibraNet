import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";

export default function Livres() {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/livres/get-all")
      .then((res) => setLivres(res.data))
      .catch((err) => console.error("Erreur lors du chargement des livres :", err));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10 flex items-center justify-center gap-2">
        <BookOpen className="w-8 h-8" />
        Catalogue des livres
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {livres.map((livre) => (
          <div key={livre.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
            
            {/* ✅ Image du livre (locale ou externe) */}
            {livre.image_url && (
              <img
                src={
                  livre.image_url.startsWith("http")
                    ? livre.image_url
                    : `http://localhost:8000${livre.image_url}`
                }
                alt={livre.titre}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {livre.titre}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              ✍️ {livre.auteur}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {livre.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
