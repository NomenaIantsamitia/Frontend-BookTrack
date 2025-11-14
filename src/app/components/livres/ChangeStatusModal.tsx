"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Livre } from "../../utils/livreUtils";

interface ChangeStatusModalProps {
  livre: Livre;
  onClose: () => void;
  onUpdated: (updatedLivre: Livre) => void;
}

export default function ChangeStatusModal({
  livre,
  onClose,
  onUpdated,
}: ChangeStatusModalProps) {
  const [pagesLues, setPagesLues] = useState(livre.pagesLues || 0);
  const [note, setNote] = useState<number | undefined>();
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [utilisateurId, setUtilisateurId] = useState<string>("");

  // ✅ Récupération de l'utilisateur connecté et préremplissage des avis
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const utilisateur = JSON.parse(userData);
      setUtilisateurId(utilisateur.id);
      
      // ✅ Préremplir les champs si l'utilisateur a déjà un avis sur ce livre
      // Maintenant utilisateurId est défini, on peut comparer
      if (livre.avis && livre.avis.length > 0) {
        const avisUser = livre.avis.find((a) => a.utilisateurId === utilisateur.id);
        if (avisUser) {
          setNote(avisUser.note || undefined);
          setContenu(avisUser.contenu || "");
          setPagesLues(livre.pagesLues || 0);
        }
      }
    }
  }, [livre]); // Retirer utilisateurId des dépendances

  const handleSave = async () => {
    if (!utilisateurId) {
      setError("Utilisateur non connecté !");
      return;
    }
  
    if (note !== undefined && (note < 0 || note > 5)) {
      setError("La note doit être comprise entre 0 et 5 !");
      return;
    }
  
    try {
      setLoading(true);
      setError("");
  
      // 1. Calculer le statut automatiquement
      let nouveauStatut = "A_LIRE";
      if (pagesLues === 0) {
        nouveauStatut = "A_LIRE";
      } else if (pagesLues >= livre.totalPages) {
        nouveauStatut = "TERMINE";
      } else {
        nouveauStatut = "EN_COURS";
      }
  
      // 2. Mettre à jour le statut et les pages lues du livre
      await api.put(`/livres/${livre.id}/statut`, {
        statut: nouveauStatut,
        pagesLues: pagesLues,
      });
  
      // 3. Ensuite mettre à jour l'avis (si note ou contenu)
      if (note !== undefined || contenu) {
        await api.post("/avis", {
          livreId: livre.id,
          utilisateurId,
          note,
          contenu,
          pagesLues, // On envoie aussi pagesLues pour la cohérence
        });
      }
  
      // 4. Récupérer le livre mis à jour
      const updatedRes = await api.get(`/livres/${livre.id}`);
      const updatedLivre = updatedRes.data;
  
      // 5. Formatter comme dans la page principale
      const formattedLivre = {
        ...updatedLivre,
        statut: (updatedLivre.statut || "A_LIRE").toUpperCase().replace(" ", "_"),
        totalPages: updatedLivre.totalPages || 0,
        pagesLues: updatedLivre.pagesLues || 0,
        progression:
          updatedLivre.totalPages > 0
            ? Math.round((updatedLivre.pagesLues / updatedLivre.totalPages) * 100)
            : 0,
        avis: updatedLivre.avis || [],
      };
  
      onUpdated(formattedLivre);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Erreur lors de la mise à jour du livre"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Mettre à jour le statut de "{livre.titre}"
        </h2>

        {/* Pages lues */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Pages lues ({pagesLues}/{livre.totalPages})
          </label>
          <input
            type="number"
            min={0}
            max={livre.totalPages}
            value={pagesLues}
            onChange={(e) => setPagesLues(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Note */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Note (0 à 5)
          </label>
          <input
            type="number"
            min={0}
            max={5}
            value={note ?? ""}
            onChange={(e) => setNote(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Avis */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Avis / commentaire
          </label>
          <textarea
            rows={3}
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Écris ton avis..."
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-2 font-medium">{error}</p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}