"use client";

import { useState, useEffect, useMemo } from "react";
import { Pencil } from "lucide-react";
import api from "@/lib/axios";
import AddLivreModal from "./AddLivreModal";
import LivreToolbar from "./livres/LivreToolbar";
import LivreGrid from "./livres/LivreGrid";
import { Livre } from "../utils/livreUtils";
import ChangeStatusModal from "./livres/ChangeStatusModal";
import EditLivreModal from "./livres/EditLivreModal";

export default function LivresPage() {
  const [livres, setLivres] = useState<Livre[]>([]);
  const [editLivre, setEditLivre] = useState<Livre | null>(null);
  const [selectedLivre, setSelectedLivre] = useState<Livre | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fonction pour charger les livres de l’utilisateur
  const fetchLivresUtilisateur = async () => {
    setIsLoading(true);
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const utilisateur = JSON.parse(userData);
      const res = await api.get(`/livres/utilisateur/${utilisateur.id}`);

      const formatted = res.data.map((l: any) => ({
        ...l,
        // 🔧 corrige les espaces, met tout en majuscule, et enlève les espaces au début/fin
        statut: (l.statut || "A_LIRE").toUpperCase().replace(/\s+/g, "_").trim(),
        totalPages: l.totalPages || 0,
        pagesLues: l.pagesLues || 0,
        progression:
          l.totalPages > 0
            ? Math.round((l.pagesLues / l.totalPages) * 100)
            : 0,
        avis: l.avis || [],
        
      }));
      
 
      setLivres(formatted);
    } catch (err) {
      console.error("Erreur :", err);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLivresUtilisateur();
  }, []);

  // ✅ Appelée après ajout de livre
  const handleAddLivre = async () => {
    await fetchLivresUtilisateur(); // 🔁 recharge la liste depuis l’API
  };
  console.log(livres);
  console.log({ filter, searchQuery });


  const filteredLivres = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return livres.filter((l) => {
      const titre = l.titre?.toLowerCase() || "";
      const auteur = l.auteur?.toLowerCase() || "";
  
      if (filter !== "all" && l.statut !== filter) return false;
      if (!query) return true;
      return titre.includes(query) || auteur.includes(query);
    });
  }, [livres, filter, searchQuery]);
  

  const handleActionClick = (action: string, livre: Livre) => {
    if (action === "ChangerStatut") {
      setSelectedLivre(livre);
    } else if (action === "Modifier") {
      setEditLivre(livre);
    } else {
      alert(`${action} : fonctionnalité à venir pour "${livre.titre}"`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex justify-center items-center min-h-screen">
        <Pencil size={48} className="text-blue-500 animate-spin" />
        <p className="ml-4 text-xl text-gray-500">
          Chargement de votre bibliothèque...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
        📚 Ma Bibliothèque
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Centre de contrôle principal avec <b>{livres.length}</b> livres.
      </p>

      <LivreToolbar
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddClick={() => setModalOpen(true)}
      />

      <LivreGrid
        livres={filteredLivres}
        viewMode={viewMode}
        onAction={handleActionClick}
      />

      {modalOpen && (
        <AddLivreModal
          onClose={() => setModalOpen(false)}
          onAdd={handleAddLivre} // ✅ Appelée après ajout
        />
      )}

{selectedLivre && (
  <ChangeStatusModal
    livre={selectedLivre}
    onClose={() => setSelectedLivre(null)}
    onUpdated={async () => {
      await fetchLivresUtilisateur(); // 🔁 Recharge depuis l’API
      setSelectedLivre(null); // 🔒 Ferme la modale
    }}
  />
)}


{editLivre && (
  <EditLivreModal
    livre={editLivre}
    onClose={() => setEditLivre(null)}
    onUpdate={async () => {
      await fetchLivresUtilisateur(); // 🔁 recharge toute la liste
      setEditLivre(null);
    }}
  />
)}
    </div>
  );
}
