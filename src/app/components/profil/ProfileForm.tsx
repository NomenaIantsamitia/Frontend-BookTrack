"use client";

import { useState } from "react";
import { Settings, Edit, AlertCircle } from "lucide-react";
import { User } from "@/types/profile";

interface ProfileFormProps {
  user: User;
  onUpdate: (formData: {
    nom: string;
    ancienMotDePasse?: string;
    nouveauMotDePasse?: string;
  }) => Promise<void>;
}

export const ProfileForm = ({ user, onUpdate }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: user.nom,
    ancienMotDePasse: "",
    nouveauMotDePasse: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Une erreur est survenue lors de la mise à jour.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Settings size={20} className="text-indigo-600" /> Informations du Compte
      </h3>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2"
        >
          <Edit size={18} /> Modifier le Profil
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ancien mot de passe
            </label>
            <input
              type="password"
              name="ancienMotDePasse"
              value={formData.ancienMotDePasse}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Entrez votre ancien mot de passe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="nouveauMotDePasse"
              value={formData.nouveauMotDePasse}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Laissez vide pour ne pas changer"
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              <AlertCircle size={18} />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-xl hover:bg-gray-400 font-medium"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};