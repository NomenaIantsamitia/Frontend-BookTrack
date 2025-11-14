"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import api from "@/lib/axios";
import { Livre } from "@/app/utils/livreUtils";

interface EditLivreModalProps {
  livre: Livre;
  onClose: () => void;
  onUpdate: (livre: Livre) => void;
}

const genres = [
  "ROMAN", "SCIENCE", "HISTOIRE", "BIOGRAPHIE", "FANTASY", 
  "TECHNOLOGIE", "PHILOSOPHIE", "POLICIER", "AVENTURE", 
  "AMOUR", "HORREUR", "POESIE", "AUTRE"
];

const genreLabels: { [key: string]: string } = {
  ROMAN: "Roman",
  SCIENCE: "Science",
  HISTOIRE: "Histoire",
  BIOGRAPHIE: "Biographie",
  FANTASY: "Fantasy",
  TECHNOLOGIE: "Technologie",
  PHILOSOPHIE: "Philosophie",
  POLICIER: "Policier",
  AVENTURE: "Aventure",
  AMOUR: "Amour",
  HORREUR: "Horreur",
  POESIE: "Poésie",
  AUTRE: "Autre"
};

export default function EditLivreModal({ livre, onClose, onUpdate }: EditLivreModalProps) {
  const [form, setForm] = useState({
    titre: livre.titre || "",
    auteur: livre.auteur || "",
    genre: livre.genre || "ROMAN",
    categorie: livre.categorie || "",
    description: livre.description || "",
    couvertureUrl: livre.couvertureUrl || "",
    totalPages: livre.totalPages || 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(livre.couvertureUrl || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewImage(livre.couvertureUrl || "");
    setForm({
      titre: livre.titre || "",
      auteur: livre.auteur || "",
      genre: livre.genre || "ROMAN",
      categorie: livre.categorie || "",
      description: livre.description || "",
      couvertureUrl: livre.couvertureUrl || "",
      totalPages: livre.totalPages || 0,
    });
  }, [livre]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: name === "totalPages" ? parseInt(value) || 0 : value 
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Veuillez sélectionner une image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5MB");
      return;
    }

    try {
      setUploading(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setSelectedFile(file);
      
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      alert("Erreur lors de la sélection de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.titre.trim() || !form.auteur.trim()) {
      alert("Le titre et l'auteur sont obligatoires");
      return;
    }
  
    if (form.totalPages < 0) {
      alert("Le nombre de pages ne peut pas être négatif");
      return;
    }
  
    try {
      setLoading(true);
      
      let updatedLivre;
  
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        formData.append('titre', form.titre);
        formData.append('auteur', form.auteur);
        formData.append('genre', form.genre);
        formData.append('categorie', form.categorie);
        formData.append('description', form.description);
        formData.append('totalPages', form.totalPages.toString());
  
        const uploadResponse = await api.put(`/livres/${livre.id}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        updatedLivre = uploadResponse.data;
      } else {
        const updateData = {
          titre: form.titre,
          auteur: form.auteur,
          genre: form.genre,
          categorie: form.categorie,
          description: form.description,
          totalPages: form.totalPages || undefined,
        };
  
        const res = await api.put(`/livres/${livre.id}`, updateData);
        updatedLivre = res.data;
      }
  
      onUpdate(updatedLivre);
      onClose();
      
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour :", err);
      alert(err.response?.data?.message || "Erreur lors de la mise à jour du livre.");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Modifier le livre
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Couverture"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Upload size={16} />
                    {uploading ? "Chargement..." : "Changer l'image"}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    PNG, JPG, JPEG (max 5MB)
                  </p>
                  {selectedFile && (
                    <p className="text-xs text-green-600 text-center">
                      ✓ Nouvelle image sélectionnée
                    </p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                    Progression de lecture
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Pages lues:</span>
                      <span className="font-medium">{livre.pagesLues || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Statut:</span>
                      <span className="font-medium capitalize">
                        {livre.statut?.toLowerCase().replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Progression:</span>
                      <span className="font-medium">{livre.progression || 0}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    ⓘ La progression se met à jour automatiquement
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Titre *
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={form.titre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Titre du livre"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Auteur *
                  </label>
                  <input
                    type="text"
                    name="auteur"
                    value={form.auteur}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Auteur du livre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Genre
                  </label>
                  <select
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>
                        {genreLabels[genre] || genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total de pages
                  </label>
                  <input
                    type="number"
                    name="totalPages"
                    value={form.totalPages}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    name="categorie"
                    value={form.categorie}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Développement personnel, Science-fiction..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Résumé du livre..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}