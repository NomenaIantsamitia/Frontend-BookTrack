import { Target, Trash2, CheckCircle, BookCheck, BookA, Trophy, Clock, BookOpen, Users } from "lucide-react";
import { Objectif, TypeObjectif, StatutObjectif } from "../../../types/objectifTypes"

interface ObjectifCardProps {
  objectif: Objectif;
  onEdit: (objectif: Objectif) => void;
  onDelete: (id: string) => void;
}

const ObjectifCard = ({ objectif, onEdit, onDelete }: ObjectifCardProps) => {
  const getObjectifDetails = () => {
    const details = {
      [TypeObjectif.LIVRES_LUS]: { icon: BookCheck, color: 'blue', unit: 'livres' },
      [TypeObjectif.PAGES_LUES]: { icon: BookA, color: 'green', unit: 'pages' },
      [TypeObjectif.STREAK_JOURS]: { icon: Trophy, color: 'orange', unit: 'jours' },
      [TypeObjectif.TEMPS_LECTURE]: { icon: Clock, color: 'purple', unit: 'minutes' },
      [TypeObjectif.GENRE_DECOUVERTE]: { icon: BookOpen, color: 'indigo', unit: 'genres' },
      [TypeObjectif.AUTEURS_DECOUVERT]: { icon: Users, color: 'pink', unit: 'auteurs' },
      [TypeObjectif.SERIE_COMPLETE]: { icon: Trophy, color: 'yellow', unit: 'séries' },
    };

    return details[objectif.type] || { icon: Target, color: 'gray', unit: 'unités' };
  };

  const details = getObjectifDetails();
  const IconComponent = details.icon;
  const progress = objectif.progressionPourcentage;
  const isCompleted = objectif.statut === StatutObjectif.TERMINE;

  const colorClasses = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' },
    gray: { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50' },
  }[details.color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${colorClasses.bg} text-white`}>
            <IconComponent size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{objectif.titre}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {objectif.valeurActuelle} / {objectif.valeurCible} {details.unit}
            </p>
          </div>
        </div>
        
        {/* ❌ Bouton modifier supprimé — on garde seulement supprimer */}
        <button 
          onClick={() => onDelete(objectif.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {objectif.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {objectif.description}
        </p>
      )}

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Progression</span>
          <span className={`font-semibold ${isCompleted ? 'text-green-600' : colorClasses.text}`}>
            {progress}% {isCompleted && '✓'}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-green-500' : colorClasses.bg 
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Début: {new Date(objectif.dateDebut).toLocaleDateString()}</span>
          <span>Fin: {new Date(objectif.dateFin).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          isCompleted 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : objectif.statut === StatutObjectif.EN_RETARD
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {objectif.statut === StatutObjectif.TERMINE ? 'Terminé' : 
           objectif.statut === StatutObjectif.EN_RETARD ? 'En retard' : 
           objectif.statut === StatutObjectif.ANNULE ? 'Annulé' : 'En cours'}
        </span>
        
        {!isCompleted && objectif.statut !== StatutObjectif.ANNULE && (
          <span className="text-xs text-gray-500">
            Restant: {objectif.valeurCible - objectif.valeurActuelle} {details.unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default ObjectifCard;
