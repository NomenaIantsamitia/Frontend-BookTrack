// components/dashboard/ErrorState.tsx
interface ErrorStateProps {
    error: string;
  }
  
  export const ErrorState = ({ error }: ErrorStateProps) => (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-screen sticky top-0">
        {/* Sidebar sera importé depuis le composant parent */}
      </div>
      <main className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>Erreur: {error}</p>
        </div>
      </main>
    </div>
  );