// app/goals/GoalsPage.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, Target, CheckCircle, Trophy } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import api from "@/lib/axios";
import { Objectif, StatutObjectif, Statistiques } from "../../types/objectifTypes";
import ObjectifModal from "../components/objectifs/ObjectifModal";
import StatistiquesPanel from "../components/objectifs/StatistiquesPanel";
import ObjectifsSection from "../components/objectifs/ObjectifsSection";
import ProtectedRoute from "../components/ProtectedRoute";
export default function GoalsPage() {
  const [objectifs, setObjectifs] = useState<Objectif[]>([]);
  const [statistiques, setStatistiques] = useState<Statistiques | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObjectif, setEditingObjectif] = useState<Objectif | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getUserId = (): string | null => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData).id : null;
    }
    return null;
  };

  const fetchObjectifs = async () => {
    try {
      setLoading(true);
      setError(null);
      const utilisateurId = getUserId();
      
      if (!utilisateurId) {
        throw new Error('Utilisateur non connecté');
      }

      const response = await api.get(`/objectifs/utilisateur/${utilisateurId}`);
      setObjectifs(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des objectifs:', err);
      setError('Impossible de charger les objectifs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistiques = async () => {
    try {
      const utilisateurId = getUserId();
      if (!utilisateurId) return;

      const response = await api.get(`/objectifs/stats/${utilisateurId}`);
      setStatistiques(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
    }
  };

  useEffect(() => {
    fetchObjectifs();
    fetchStatistiques();
  }, []);

  const handleSaveObjectif = async (data: any, isEditing: boolean, id?: string) => {
    try {
      setModalLoading(true);
      setError(null);
  
      if (isEditing && id) {
        const response = await api.put(`/objectifs/${id}`, data);
        // 🔥 Met à jour directement l’objectif dans le state
        setObjectifs((prev) =>
          prev.map((obj) => (obj.id === id ? response.data : obj))
        );
      } else {
        const response = await api.post('/objectifs', data);
        // 🔥 Ajoute le nouvel objectif localement
        setObjectifs((prev) => [...prev, response.data]);
      }
  
      // 🔁 Met à jour les statistiques aussi
      fetchStatistiques();
  
      setIsModalOpen(false);
      setEditingObjectif(null);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError('Erreur lors de la sauvegarde de l\'objectif');
    } finally {
      setModalLoading(false);
    }
  };
  

  const handleDeleteObjectif = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) return;

    try {
      setLoading(true);
      setError(null);
      
      await api.delete(`/objectifs/${id}`);
      
      await fetchObjectifs();
      await fetchStatistiques();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError('Erreur lors de la suppression de l\'objectif');
      setLoading(false);
    }
  };

  const handleEditObjectif = (obj: Objectif) => {
    setEditingObjectif(obj);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingObjectif(null);
    setIsModalOpen(true);
  };

  // Filtrer les objectifs
  const objectifsActifs = objectifs.filter(obj => 
    obj.statut === StatutObjectif.ACTIF || obj.statut === StatutObjectif.EN_RETARD
  );
  const objectifsTermines = objectifs.filter(obj => obj.statut === StatutObjectif.TERMINE);
  const objectifsAnnules = objectifs.filter(obj => obj.statut === StatutObjectif.ANNULE);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des objectifs...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
       <ProtectedRoute>
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>
      
      <main className="flex-1 p-8 overflow-y-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              🎯 Mes Objectifs
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Suivez et gérez vos objectifs de lecture
            </p>
          </div>
          
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition"
          >
            <Plus size={20} />
            Nouvel objectif
          </button>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Statistiques */}
        <StatistiquesPanel statistiques={statistiques} />

        {/* Objectifs Actifs */}
        <ObjectifsSection
          title="Objectifs Actifs"
          icon={Target}
          objectifs={objectifsActifs}
          onEdit={handleEditObjectif}
          onDelete={handleDeleteObjectif}
          onCreate={openCreateModal}
          emptyMessage="Aucun objectif actif"
          emptyDescription="Créez votre premier objectif pour commencer à suivre votre progression"
        />

        {/* Objectifs Terminés */}
        {objectifsTermines.length > 0 && (
          <ObjectifsSection
            title="Objectifs Accomplis"
            icon={CheckCircle}
            objectifs={objectifsTermines}
            onEdit={handleEditObjectif}
            onDelete={handleDeleteObjectif}
            emptyMessage="Aucun objectif terminé"
            emptyDescription="Continuez vos efforts pour accomplir vos objectifs"
          />
        )}

        {/* Objectifs Annulés */}
        {objectifsAnnules.length > 0 && (
          <ObjectifsSection
            title="Objectifs Annulés"
            icon={Trophy}
            objectifs={objectifsAnnules}
            onEdit={handleEditObjectif}
            onDelete={handleDeleteObjectif}
            emptyMessage="Aucun objectif annulé"
            emptyDescription="Les objectifs annulés apparaîtront ici"
          />
        )}

        {/* Modale */}
        <ObjectifModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingObjectif(null);
          }}
          onSave={handleSaveObjectif}
          objectif={editingObjectif}
          loading={modalLoading}
        />
      </main>
    </div>
    </ProtectedRoute>
  );
}