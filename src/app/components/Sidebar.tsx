"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import pour redirection
import { 
  BookOpen, LayoutDashboard, BarChart3, Target, 
  User, Settings, LogOut, Calendar 
} from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  const router = useRouter(); // ✅ Hook pour navigation
  const [active, setActive] = useState("Tableau de bord");

  const links = [
    { name: "Tableau de bord", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { name: "Mes livres", icon: <BookOpen size={20} />, href: "/livres" },


    { name: "Objectifs", icon: <Target size={20} />, href: "/objectifs" },
    { name: "Profil", icon: <User size={20} />, href: "/profil" },

  ];

  // ✅ Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    router.push("/"); // Redirige vers la page de connexion
  };

  return (
    <aside className="h-screen w-64 bg-indigo-600 text-white flex flex-col shadow-2xl">
      <div className="p-6 text-2xl font-bold tracking-tight">📚 BookTrack</div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setActive(link.name)} 
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition 
              ${active === link.name 
                ? "bg-indigo-500 shadow-md" 
                : "hover:bg-indigo-700/40"}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-indigo-500">
        <button
          onClick={handleLogout} // ✅ Lien vers la fonction de déconnexion
          className="flex items-center gap-2 hover:text-indigo-200 transition"
        >
          <LogOut size={20} /> Déconnexion
        </button>
      </div>
    </aside>
  );
};
