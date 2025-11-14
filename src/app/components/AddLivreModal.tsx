"use client";

import { useState, useEffect, ChangeEvent } from "react";
import api from "@/lib/axios";

interface AddLivreModalProps {
  onClose: () => void;
  onAdd: (livre: any) => void;
}

export default function AddLivreModal({ onClose, onAdd }: AddLivreModalProps) {
  const [form, setForm] = useState({
    titre: "",
    auteur: "",
    description: "",
    genre: "ROMAN",
    categorie: "",
    datePublication: "",
    totalPages: 10,
    utilisateurId: "", // ⚠️ au début vide
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // ✅ Charger l’utilisateur connecté au montage du composant
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const utilisateur = JSON.parse(user);
      setForm((prev) => ({ ...prev, utilisateurId: utilisateur.id }));
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        data.append(key, String(value))
      );
      if (imageFile) data.append("file", imageFile);
  
      const res = await api.post("/livres/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      onAdd(res.data); // ✅ passe le livre ajouté
      onClose();
    } catch (err) {
      console.error("Erreur lors de l’ajout du livre :", err);
    }
  };
  


  // ✅ Liste complète des genres depuis ton enum Prisma
  const genres = [
    "ROMAN",
    "SCIENCE",
    "HISTOIRE",
    "BIOGRAPHIE",
    "FANTASY",
    "TECHNOLOGIE",
    "PHILOSOPHIE",
    "POLICIER",
    "AVENTURE",
    "AMOUR",
    "HORREUR",
    "POESIE",
    "AUTRE",
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            📖 Ajouter un Livre
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="titre"
            placeholder="Titre du livre (obligatoire)"
            value={form.titre}
            onChange={handleChange}
            className="border-b focus:border-blue-500 p-2 w-full text-lg outline-none transition"
            required
          />
          <input
            type="text"
            name="auteur"
            placeholder="Auteur/Autrice (obligatoire)"
            value={form.auteur}
            onChange={handleChange}
            className="border-b focus:border-blue-500 p-2 w-full outline-none transition"
            required
          />

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Couverture
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="block text-blue-500 font-medium cursor-pointer"
              >
                {imageFile
                  ? imageFile.name
                  : "Cliquez pour choisir une image ou glissez-déposez"}
              </label>
              {imageFile && (
                <p className="text-xs text-gray-500 mt-1">
                  Image sélectionnée : {imageFile.name}
                </p>
              )}
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Description courte du livre"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="border rounded p-2 w-full resize-y focus:ring-blue-500 focus:border-blue-500"
          />

          {/* ✅ Sélection complète du genre */}
          <div className="flex space-x-4">
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="border rounded p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0) + g.slice(1).toLowerCase().replace("_", " ")}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="categorie"
              placeholder="Catégorie (ex: Fantaisie Urbaine)"
              value={form.categorie}
              onChange={handleChange}
              className="border rounded p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-4">
          <div className="w-1/2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Date de publication
  </label>
  <input
    type="date"
    name="datePublication"
    value={form.datePublication}
    onChange={handleChange}
    max={new Date().toISOString().split("T")[0]} // ✅ interdit les dates futures
    className="border rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500"
    required
  />
</div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de pages
              </label>
              <input
                type="number"
                name="totalPages"
                placeholder="10"
                value={form.totalPages}
                onChange={handleChange}
                min="10"
                className="border rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Ajouter le Livre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
