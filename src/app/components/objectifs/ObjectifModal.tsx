import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Objectif, TypeObjectif } from "../../../types/objectifTypes";

interface ObjectifModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any, isEditing: boolean, id?: string) => void;
  objectif?: Objectif | null;
  loading?: boolean;
}

const ObjectifModal = ({ isOpen, onClose, onSave, objectif, loading }: ObjectifModalProps) => {
  const isEditing = !!objectif;

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    type: TypeObjectif.LIVRES_LUS,
    valeurCible: 1,
    dateDebut: today,
    dateFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    utilisateurId: "",
  });

  useEffect(() => {
    if (objectif) {
      setFormData({
        titre: objectif.titre,
        description: objectif.description || "",
        type: objectif.type,
        valeurCible: objectif.valeurCible,
        dateDebut: objectif.dateDebut.split("T")[0],
        dateFin: objectif.dateFin.split("T")[0],
        utilisateurId: objectif.utilisateurId,
      });
    } else {
      const userData = localStorage.getItem("user");
      const utilisateurId = userData ? JSON.parse(userData).id : "";

      setFormData({
        titre: "",
        description: "",
        type: TypeObjectif.LIVRES_LUS,
        valeurCible: 1,
        dateDebut: today,
        dateFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        utilisateurId,
      });
    }
  }, [objectif]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logique avant sauvegarde
    if (formData.dateDebut < today) {
      alert("La date de début ne peut pas être antérieure à aujourd'hui.");
      return;
    }

    if (formData.dateFin < formData.dateDebut) {
      alert("La date de fin doit être postérieure à la date de début.");
      return;
    }

    onSave(formData, isEditing, objectif?.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-3xl max-w-md w-full m-4 p-6">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {objectif ? "Modifier l'objectif" : "Nouvel objectif"}
          </h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Champ titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Titre de l'objectif *
            </label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              required
              disabled={loading}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
            />
          </div>

          {/* Champ description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              disabled={loading}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
            />
          </div>

          {/* Type et cible */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TypeObjectif })}
                disabled={loading}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              >
                <option value={TypeObjectif.LIVRES_LUS}>Livres lus</option>
                <option value={TypeObjectif.PAGES_LUES}>Pages lues</option>
                <option value={TypeObjectif.STREAK_JOURS}>Streak de jours</option>
                <option value={TypeObjectif.TEMPS_LECTURE}>Temps de lecture</option>
                <option value={TypeObjectif.GENRE_DECOUVERTE}>Genres découverts</option>
                <option value={TypeObjectif.AUTEURS_DECOUVERT}>Auteurs découverts</option>
                <option value={TypeObjectif.SERIE_COMPLETE}>Séries complétées</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cible *
              </label>
              <input
                type="number"
                min="1"
                value={formData.valeurCible}
                onChange={(e) => setFormData({ ...formData, valeurCible: parseInt(e.target.value) })}
                required
                disabled={loading}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de début *
              </label>
              <input
                type="date"
                min={today} // 🔒 empêche une date antérieure à aujourd'hui
                value={formData.dateDebut}
                onChange={(e) => {
                  const newDebut = e.target.value;
                  // ajuste la date de fin si elle devient avant la date de début
                  if (formData.dateFin < newDebut) {
                    setFormData({ ...formData, dateDebut: newDebut, dateFin: newDebut });
                  } else {
                    setFormData({ ...formData, dateDebut: newDebut });
                  }
                }}
                required
                disabled={loading}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de fin *
              </label>
              <input
                type="date"
                min={formData.dateDebut} // 🔒 empêche une date de fin avant le début
                value={formData.dateFin}
                onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                required
                disabled={loading}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Plus size={16} />}
              {isEditing ? "Sauvegarder" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ObjectifModal;
