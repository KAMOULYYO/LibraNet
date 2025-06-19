import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListeLivres() {
  const [livres, setLivres] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/livres/get-all")
      .then((res) => setLivres(res.data))
      .catch((err) => console.error("Erreur chargement livres:", err));
  }, []);

  const supprimerLivre = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) return;

    try {
      await axios.delete(`http://localhost:8000/livres/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivres(livres.filter((livre) => livre.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
        <Book /> Liste des livres
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {livres.map((livre) => (
          <div
            key={livre.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          >
            <img
              src={
                livre.image_url.startsWith("http")
                  ? livre.image_url
                  : `http://localhost:8000${livre.image_url}`
              }
              alt={livre.titre}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {livre.titre}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              Auteur : {livre.auteur}
            </p>

            <div className="flex justify-between gap-3 mt-3">
              <button
                onClick={() => navigate(`/admin/edit-book/${livre.id}`)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm rounded flex items-center gap-1"
              >
                <Pencil size={16} /> Modifier
              </button>
              <button
                onClick={() => supprimerLivre(livre.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded flex items-center gap-1"
              >
                <Trash2 size={16} /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
