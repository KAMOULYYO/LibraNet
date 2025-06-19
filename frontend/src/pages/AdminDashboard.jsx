import { Link, Outlet } from "react-router-dom";
import { Users, BookOpen, LayoutDashboard, Pencil, Trash2, List } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 text-blue-600 dark:text-blue-400 font-bold text-xl flex items-center gap-2">
          <LayoutDashboard /> Admin LibraNet
        </div>
        <nav className="mt-6 space-y-2 px-4 text-sm">
          <Link to="users" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition">
            <Users size={18} /> Liste des utilisateurs
          </Link>
          <Link to="add-book" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition">
            <BookOpen size={18} /> Ajouter un livre
          </Link>
          <Link to="livres" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition">
            <List size={18} /> Liste des livres
          </Link>
        </nav>
      </aside>

      {/* Contenu dynamique */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
