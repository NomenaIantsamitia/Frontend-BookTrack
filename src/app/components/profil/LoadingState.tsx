// components/profile/LoadingState.tsx
import { Sidebar } from "../Sidebar";

export const LoadingState = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement du profil...</p>
      </div>
    </div>
  </div>
);