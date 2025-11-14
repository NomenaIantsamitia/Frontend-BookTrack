// components/profile/AvisList.tsx
import { Star } from "lucide-react";
import { Avis } from "@/types/profile";

interface AvisListProps {
  avisList: Avis[];
}

const AvisItem = ({ avis }: { avis: Avis }) => (
  <div className="flex justify-between items-center p-3 border-b last:border-b-0">
    <div className="flex items-center gap-2">
      <Star size={18} className="text-yellow-500 fill-yellow-500" />
      <span className="font-semibold text-gray-800">{avis.note.toFixed(1)}</span>
      <span className="text-gray-600">sur</span>
      <span className="italic text-indigo-600">{avis.livre}</span>
    </div>
    <span className="text-sm text-gray-400">{avis.date}</span>
  </div>
);

export const AvisList = ({ avisList }: AvisListProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <Star size={20} className="text-indigo-600"/> Derniers Avis
    </h3>
    <div className="space-y-3">
      {avisList.map(avis => (
        <AvisItem key={avis.id} avis={avis} />
      ))}
    </div>
  </div>
);