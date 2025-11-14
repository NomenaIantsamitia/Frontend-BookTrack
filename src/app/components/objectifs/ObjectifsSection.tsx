// components/objectifs/ObjectifsSection.tsx
import { Target, Plus, CheckCircle, Trophy } from "lucide-react";
import { Objectif, StatutObjectif } from "../../../types/objectifTypes";
import ObjectifCard from "./ObjectifCard";

interface ObjectifsSectionProps {
  title: string;
  icon: React.ElementType;
  objectifs: Objectif[];
  onEdit: (objectif: Objectif) => void;
  onDelete: (id: string) => void;
  onCreate?: () => void;
  emptyMessage: string;
  emptyDescription: string;
}

const ObjectifsSection = ({
  title,
  icon: Icon,
  objectifs,
  onEdit,
  onDelete,
  onCreate,
  emptyMessage,
  emptyDescription
}: ObjectifsSectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Icon className="text-green-500" />
        {title} ({objectifs.length})
      </h2>
      
      {objectifs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectifs.map((objectif) => (
            <ObjectifCard
              key={objectif.id}
              objectif={objectif}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {emptyMessage}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {emptyDescription}
          </p>
          {onCreate && (
            <button
              onClick={onCreate}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Plus size={16} />
              Créer un objectif
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default ObjectifsSection;