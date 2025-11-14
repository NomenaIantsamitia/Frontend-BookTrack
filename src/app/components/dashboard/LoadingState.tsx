// components/dashboard/LoadingState.tsx
export const LoadingState = () => (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-screen sticky top-0">
        {/* Sidebar sera importé depuis le composant parent */}
      </div>
      <main className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des données...</p>
        </div>
      </main>
    </div>
  );