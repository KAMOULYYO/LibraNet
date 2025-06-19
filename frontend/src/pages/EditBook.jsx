import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [livre, setLivre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Champs supplémentaires
  const [purchase_price, setPurchasePrice] = useState("");
  const [reservation_price, setReservationPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/livres/get-by-id/${id}`)
      .then((res) => {
        setLivre(res.data);
        setPurchasePrice(res.data.purchase_price);
        setReservationPrice(res.data.reservation_price);
        setStock(res.data.stock);
      })
      .catch((err) => {
        console.error("Erreur chargement livre:", err);
        setError("Impossible de charger le livre");
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const updatedBook = {
      ...livre,
      purchase_price: parseFloat(purchase_price),
      reservation_price: parseFloat(reservation_price),
      stock: parseInt(stock),
    };

    try {
      await axios.put(`http://localhost:8000/livres/edit/${id}`, updatedBook, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/admin/list-livre");
    } catch (err) {
      console.error("Erreur modification :", err);
      setError("Erreur lors de la modification du livre");
    } finally {
      setLoading(false);
    }
  };

  if (!livre) return <p className="text-center mt-10 text-gray-500">Chargement...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
        ✏️ Modifier le livre
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded"
          type="text"
          placeholder="Titre"
          value={livre.titre}
          onChange={(e) => setLivre({ ...livre, titre: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border rounded"
          type="text"
          placeholder="Auteur"
          value={livre.auteur}
          onChange={(e) => setLivre({ ...livre, auteur: e.target.value })}
        />
        <textarea
          className="w-full px-4 py-2 border rounded"
          placeholder="Description"
          rows={4}
          value={livre.description}
          onChange={(e) => setLivre({ ...livre, description: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border rounded"
          type="url"
          placeholder="Image URL"
          value={livre.image_url}
          onChange={(e) => setLivre({ ...livre, image_url: e.target.value })}
        />
        <input
          type="number"
          className="w-full px-4 py-2 border rounded"
          value={purchase_price}
          onChange={(e) => setPurchasePrice(e.target.value)}
          required
          placeholder="Prix d'achat"
        />
        <input
          type="number"
          className="w-full px-4 py-2 border rounded"
          value={reservation_price}
          onChange={(e) => setReservationPrice(e.target.value)}
          required
          placeholder="Prix de réservation"
        />
        <input
          type="number"
          className="w-full px-4 py-2 border rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          placeholder="Stock disponible"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Modification..." : "✅ Modifier"}
        </button>
      </form>
    </div>
  );
}
