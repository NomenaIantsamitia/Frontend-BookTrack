// components/dashboard/GoalsSection.tsx
import Link from "next/link";
import { ObjectifCard } from "./ObjectifCard";
import { Target, TrendingUp } from "lucide-react";

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

interface GoalsSectionProps {
  objectifs: Objectif[];
}

export const GoalsSection = ({ objectifs }: GoalsSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" /> 
          Objectifs du Mois
        </h2>
        <Link 
          href="/objectifs" 
          className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors flex items-center gap-1"
        >
          Gérer <TrendingUp size={16} />
        </Link>
      </div>
      
      <div className="space-y-4">
        {objectifs.length > 0 ? (
          objectifs.map((objectif) => (
            <ObjectifCard key={objectif.id} objectif={objectif} />
          ))
        ) : (
          <div className="text-center py-6">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-3">Aucun objectif ce mois-ci</p>
            <Link 
              href="/objectifs" 
              className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 text-sm font-medium"
            >
              Créer des objectifs →
            </Link>
          </div>
        )}
      </div>

      {/* Résumé des objectifs */}
      {objectifs.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progression globale:</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {Math.round(objectifs.reduce((acc, obj) => acc + obj.progressionPourcentage, 0) / objectifs.length)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600 mt-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-500"
              style={{ 
                width: `${objectifs.reduce((acc, obj) => acc + obj.progressionPourcentage, 0) / objectifs.length}%` 
              }}
            ></div>
          </div>
        </div>
      )}
    </section>
  );
};