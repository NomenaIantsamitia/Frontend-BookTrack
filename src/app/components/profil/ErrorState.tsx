// components/profile/ErrorState.tsx
import { Sidebar } from "../Sidebar";

interface ErrorStateProps {
  error: string | null;
  userId: string | null;
  onRetry: (userId: string) => void;
}

export const ErrorState = ({ error, userId, onRetry }: ErrorStateProps) => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center text-red-600">
        <p>{error || "Erreur lors du chargement du profil"}</p>
        {userId && (
          <button 
            onClick={() => onRetry(userId)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  </div>
);