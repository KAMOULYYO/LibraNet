import { useState } from "react";
import {
  BookOpenCheck,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Book,
  ImagePlus,
  PenLine,
  DollarSign,
  Package,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AjouterLivre() {
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [purchase_price, setPurchasePrice] = useState("");
  const [reservation_price, setReservationPrice] = useState("");
  const [stock, setStock] = useState("");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      console.log({
  titre,
  auteur,
  description,
  image_url,
  purchase_price: parseFloat(purchase_price),
  reservation_price: parseFloat(reservation_price),
  stock: parseInt(stock)
});

      const res = await axios.post(
        "http://localhost:8000/livres/create",
        {
          titre,
          auteur,
          description,
          image_url,
          purchase_price: parseFloat(purchase_price),
          reservation_price: parseFloat(reservation_price),
          stock: parseInt(stock),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(true);
      setTitre("");
      setAuteur("");
      setDescription("");
      setImageUrl("");
      setPurchasePrice("");
      setReservationPrice("");
      setStock("");
    } catch (err) {
      console.error("Erreur ajout livre:", err);
      setError("❌ Une erreur est survenue !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 flex items-center justify-center gap-3">
          <BookOpenCheck className="w-7 h-7" />
          📘 Ajouter un livre
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Titre */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2 mb-1">📚 Titre du livre</label>
            <div className="relative">
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                placeholder="Ex: Le Petit Prince"
                className="w-full px-4 py-3 rounded-lg bg-white border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-300 dark:text-white"
              />
              <Book className="absolute top-3 right-3 text-gray-400" />
            </div>
          </div>

          {/* Auteur */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2 mb-1">✍️ Auteur</label>
            <div className="relative">
              <input
                type="text"
                value={auteur}
                onChange={(e) => setAuteur(e.target.value)}
                required
                placeholder="Ex: Antoine de Saint-Exupéry"
                className="w-full px-4 py-3 rounded-lg bg-white border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-300 dark:text-white"
              />
              <PenLine className="absolute top-3 right-3 text-gray-400" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2 mb-1">📝 Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Résumé du livre, mots-clés, genre..."
              className="w-full px-4 py-3 rounded-lg bg-white border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-300 dark:text-white"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2 mb-1">🖼️ Image (URL)</label>
            <div className="relative">
              <input
                type="url"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg bg-white border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-300 dark:text-white"
              />
              <ImagePlus className="absolute top-3 right-3 text-gray-400" />
            </div>
          </div>

          {/* Prix achat */}
          <div>
            <label className="text-sm font-semibold mb-1">💵 Prix d'achat</label>
            <input
              type="number"
              step="0.01"
              value={purchase_price}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-300 dark:text-white"
              required
            />
          </div>

          {/* Prix réservation */}
          <div>
            <label className="text-sm font-semibold mb-1">💰 Prix de réservation</label>
            <input
              type="number"
              step="0.01"
              value={reservation_price}
              onChange={(e) => setReservationPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-300 dark:text-white"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-semibold mb-1">📦 Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-300 dark:text-white"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "🚀 Ajouter le livre"}
          </motion.button>
        </form>

        {/* Résultat */}
        {success && (
          <motion.div className="flex items-center gap-2 text-green-600 dark:text-green-400 mt-4 justify-center">
            <CheckCircle2 /> Livre ajouté avec succès 🎉
          </motion.div>
        )}
        {error && (
          <motion.div className="flex items-center gap-2 text-red-500 mt-4 justify-center">
            <AlertTriangle /> {error}
          </motion.div>
        )}

        {/* Prévisualisation de l'image */}
        {image_url && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Aperçu de l'image :</p>
            <img src={image_url} alt="Preview" className="rounded-lg max-h-64 mx-auto shadow" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
