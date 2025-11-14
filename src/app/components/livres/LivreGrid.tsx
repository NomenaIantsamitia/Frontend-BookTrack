import { useState, useEffect } from "react";
import { BookA } from "lucide-react";
import LivreItemCard from "./LivreItemCard";
import DeleteLivreModal from "./DeleteLivreModal";
import api from "@/lib/axios";
import { Livre } from "@/app/utils/livreUtils";
import LivreDetailModal from "./LivreDetailModal";

interface LivreGridProps {
  livres: Livre[];
  viewMode: "grid" | "list";
  onAction: (action: string, livre: Livre) => void;
}

export default function LivreGrid({ livres, viewMode, onAction }: LivreGridProps) {
  const [livresState, setLivresState] = useState<Livre[]>(livres);
  const [livreSelectionne, setLivreSelectionne] = useState<Livre | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [livreDetail, setLivreDetail] = useState<Livre | null>(null);

  // 🔄 Synchroniser livresState à chaque changement des props
  useEffect(() => {
    setLivresState(livres);
  }, [livres]);

  const handleConfirmDelete = async () => {
    if (!livreSelectionne) return;
    try {
      await api.delete(`/livres/${livreSelectionne.id}`);
      setLivresState((prev) => prev.filter((l) => l.id !== livreSelectionne.id));
      setShowDeleteModal(false);
      setLivreSelectionne(null);
    } catch (error) {
      console.error(error);
      alert("❌ Une erreur est survenue lors de la suppression du livre.");
    }
  };

  const handleViewClick = (livre: Livre) => {
    setLivreDetail(livre);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (livre: Livre) => {
    setLivreSelectionne(livre);
    setShowDeleteModal(true);
  };

  if (livresState.length === 0) {
    return (
      <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-inner">
        <BookA size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Aucun livre trouvé.
        </p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {livresState.map((livre) => (
            <LivreItemCard
              key={livre.id}
              livre={livre}
              onEditClick={(l) => onAction("Modifier", l)}
              onDeleteClick={handleDeleteClick}
              onStatusClick={(l) => onAction("ChangerStatut", l)}
              onViewClick={handleViewClick}
            />
          ))}
        </div>

        <DeleteLivreModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          titreLivre={livreSelectionne?.titre}
        />

        <LivreDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          livre={livreDetail}
        />
      </>
    );
  }

  return (
    <p className="text-center text-gray-500 dark:text-gray-400 p-8 border-2 border-dashed rounded-xl">
      Vue liste à venir.
    </p>
  );
}
