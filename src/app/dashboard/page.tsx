"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { StatsSection } from "../components/dashboard/StatsSection";
import { ReadingSection } from "../components/dashboard/ReadingSection";
import { FavoritesSection } from "../components/dashboard/FavoritesSection";
import { GoalsSection } from "../components/dashboard/GoalsSection";
import { LoadingState } from "../components/dashboard/LoadingState";
import { ErrorState } from "../components/dashboard/ErrorState";
import api from "@/lib/axios";
import ProtectedRoute from "../components/ProtectedRoute";

interface StatsData {
  livresLusCetteAnnee: number;
  livresEnCours: number;
  totalPagesLues: number;
  moyenneNote: number;
}

interface ReadingBook {
  id: string;
  titre: string;
  auteur: string;
  progression: number;
}

interface FavoriteBook {
  id: string;
  titre: string;
  auteur: string;
  note: number;
}

interface Objectif {
  id: string;
  titre: string;
  description: string;
  type: string;
  valeurCible: number;
  valeurActuelle: number;
  progressionPourcentage: number;
  statut: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [readingList, setReadingList] = useState<ReadingBook[]>([]);
  const [recentFavorites, setRecentFavorites] = useState<FavoriteBook[]>([]);
  const [objectifs, setObjectifs] = useState<Objectif[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserId = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.id;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        if (!userId) throw new Error("Utilisateur non connecté");
  
        const statsResponse = await api.get(`/statistiques/${userId}`);
        setStats(statsResponse.data);
  
        const livresEnCoursResponse = await api.get(`/livres/en-cours/${userId}`);
        setReadingList(livresEnCoursResponse.data);
  
        const favorisResponse = await api.get(`/livres/favoris/${userId}`);
        setRecentFavorites(favorisResponse.data);

        const objectifsResponse = await api.get(`/statistiques/objectifs/${userId}`);
        setObjectifs(objectifsResponse.data);
  
      } catch (err: unknown) {
        const error = err as ApiError;
        setError(error.response?.data?.message || error.message || "Erreur lors du chargement des données");
        console.error("Erreur dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              Bonjour, Lecteur 📚
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Bienvenue sur votre tableau de bord personnalisé. Voici où vous en êtes.
            </p>
          </div>

          <StatsSection stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ReadingSection readingList={readingList} />
              <FavoritesSection recentFavorites={recentFavorites} />
            </div>

            <div className="lg:col-span-1">
              <GoalsSection objectifs={objectifs} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}