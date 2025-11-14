
// components/profile/ObjectifsList.tsx
import { Target, CheckCircle, Clock } from "lucide-react";
import { Objectif } from "@/types/profile";

interface ObjectifsListProps {
  objectifs: Objectif[];
}

const ObjectifItem = ({ objectif }: { objectif: Objectif }) => {
  const isComplete = objectif.statut === "TERMINE";
  
  return (
    <div className="p-3 border rounded-xl bg-white hover:shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <p className="font-medium text-gray-700 flex items-center gap-2">
          {isComplete ? (
            <CheckCircle size={18} className="text-green-500" />
          ) : (
            <Clock size={18} className="text-indigo-500" />
          )}
          {objectif.titre}
        </p>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isComplete
              ? "bg-green-100 text-green-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {isComplete ? "Terminé" : `${objectif.progression}%`}
        </span>
      </div>
    </div>
  );
};

export const ObjectifsList = ({ objectifs }: ObjectifsListProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <Target size={20} className="text-indigo-600"/> Objectifs Récents
    </h3>
    <div className="space-y-3">
      {objectifs.map(obj => (
        <ObjectifItem key={obj.id} objectif={obj} />
      ))}
    </div>
  </div>
);