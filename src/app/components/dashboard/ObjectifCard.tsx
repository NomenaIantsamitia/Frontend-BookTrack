// components/dashboard/ObjectifCard.tsx
import { BookCheck, BookA, Award, Target } from "lucide-react";

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

interface ObjectifCardProps {
  objectif: Objectif;
}

export const ObjectifCard = ({ objectif }: ObjectifCardProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'LIVRES_LUS': return <BookCheck className="w-5 h-5" />;
      case 'PAGES_LUES': return <BookA className="w-5 h-5" />;
      case 'GENRE_DECOUVERTE': return <Award className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'LIVRES_LUS': return 'bg-blue-500';
      case 'PAGES_LUES': return 'bg-green-500';
      case 'GENRE_DECOUVERTE': return 'bg-purple-500';
      default: return 'bg-indigo-500';
    }
  };

  const isCompleted = objectif.progressionPourcentage >= 100;

  return (
    <div className={`p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md border-l-4 ${
      isCompleted ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'
    } hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${
            isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            {getIcon(objectif.type)}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{objectif.titre}</h3>
        </div>
        {isCompleted && (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
            Terminé
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{objectif.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Progression: {objectif.valeurActuelle}/{objectif.valeurCible}
          </span>
          <span className="font-bold text-gray-900 dark:text-white">
            {Math.round(objectif.progressionPourcentage)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-green-500' : getColor(objectif.type)
            }`}
            style={{ width: `${objectif.progressionPourcentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};