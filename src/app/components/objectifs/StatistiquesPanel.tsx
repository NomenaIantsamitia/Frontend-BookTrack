// components/objectifs/StatistiquesPanel.tsx
import { Statistiques } from "../../../types/objectifTypes";

interface StatistiquesPanelProps {
  statistiques: Statistiques | null;
}

const StatistiquesPanel = ({ statistiques }: StatistiquesPanelProps) => {
  if (!statistiques) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-blue-200 dark:border-blue-800">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {statistiques.total}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-green-200 dark:border-green-800">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
          {statistiques.actifs}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Actifs</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-orange-200 dark:border-orange-800">
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          {statistiques.termines}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Terminés</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-purple-200 dark:border-purple-800">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {statistiques.progressionMoyenne}%
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Progression moyenne</div>
      </div>
    </div>
  );
};

export default StatistiquesPanel;