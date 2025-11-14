// app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { LoadingState } from "../components/profil/LoadingState";
import { ErrorState } from "../components/profil/ErrorState";
import { UserIdentityCard } from "../components/profil/UserIdentityCard";
import { ProfileForm } from "../components/profil/ProfileForm";
import { StatsSection } from "../components/profil/StatsSection";
import { ObjectifsList } from "../components/profil/ObjectifsList";
import { AvisList } from "../components/profil/AvisList";
import api from "@/lib/axios";
import { UserData } from "@/types/profile";
import { AxiosError } from "axios";
import ProtectedRoute from "../components/ProtectedRoute";

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Charger l'utilisateur connecté
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
      fetchUserProfile(parsedUser.id);
    } else {
      setError("Utilisateur non connecté !");
      setLoading(false);
    }
  }, []);

  // ✅ Charger les infos du profil
  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/profil/profile/${userId}`);
      setUserData(response.data);
    } catch (err) {
      setError("Erreur lors du chargement du profil");
      console.error("Erreur :", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (formData: {
    nom: string;
    ancienMotDePasse?: string;
    nouveauMotDePasse?: string;
  }): Promise<void> => {
    if (!userId) throw new Error("Utilisateur non trouvé !");
    try {
      // n'attends pas de retourner l'AxiosResponse — on renvoie void pour correspondre aux types
      await api.put(`/profil/profile/${userId}`, formData);
      // Recharger les données après mise à jour
      await fetchUserProfile(userId);
    }catch (err: unknown) {
   
    
      // on force le typage explicite
      const axiosErr = err as AxiosError<{ message?: string; error?: string }>;
    
      const backendMessage =
        axiosErr.response?.data?.message ||
        axiosErr.response?.data?.error ||
        axiosErr.message ||
        "Erreur lors de la mise à jour du profil";
    
      throw new Error(backendMessage);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !userData) {
    return (
      <ErrorState 
        error={error} 
        userId={userId} 
        onRetry={fetchUserProfile} 
      />
    );
  }

  const { utilisateur, stats, objectifsRecents, derniersAvis } = userData;

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-gray-50">
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
          <User size={28} className="text-indigo-600" /> Mon Profil
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === COLONNE GAUCHE === */}
          <div className="lg:col-span-1 space-y-8">
            <UserIdentityCard user={utilisateur} />
            <ProfileForm user={utilisateur} onUpdate={handleProfileUpdate} />
          </div>

          {/* === COLONNE DROITE === */}
          <div className="lg:col-span-2 space-y-8">
            <StatsSection stats={stats} />
            <ObjectifsList objectifs={objectifsRecents} />
            <AvisList avisList={derniersAvis} />
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}