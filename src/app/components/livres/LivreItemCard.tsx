"use client";

import { Pencil, Trash2, Eye, Star, BookCheck } from "lucide-react";
import Link from "next/link";
import { getAverageRating, getCoverUrl, Livre } from "../../utils/livreUtils"

interface LivreItemCardProps {
  livre: Livre;
  onStatusClick: (livre: Livre) => void;
  onEditClick: (livre: Livre) => void;
  onDeleteClick: (livre: Livre) => void;
  onViewClick: (livre: Livre) => void;
}

export default function LivreItemCard({
  livre,
  onStatusClick,
  onEditClick,
  onDeleteClick,
  onViewClick,
}: LivreItemCardProps) {
  const statusMap = {
    TERMINE: { label: "Terminé", color: "bg-emerald-500" },
    EN_COURS: { label: "En cours", color: "bg-indigo-500" },
    A_LIRE: { label: "À lire", color: "bg-yellow-500" },
  };

  const currentStatusKey = (livre.statut || "").toUpperCase().replace(" ", "_");
  const currentStatus =
    statusMap[currentStatusKey as keyof typeof statusMap] || {
      label: "Non spécifié",
      color: "bg-gray-500",
    };

  const rating = getAverageRating(livre.avis);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 border border-gray-200 dark:border-gray-700">
      <Link
        href={`/livre/${livre.id}`}
        onClick={(e) => {
          e.preventDefault();
          onViewClick(livre);
        }}
        className="block relative h-60 w-full"
      >
        <img
          src={getCoverUrl(livre.couvertureUrl)}
          alt={livre.titre}
          className="object-cover w-full h-full bg-gray-100 dark:bg-gray-700"
        />
        <span
          className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold text-white rounded-full ${currentStatus.color}`}
        >
          {currentStatus.label}
        </span>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
          {livre.titre}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {livre.auteur}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex text-yellow-400">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <Star key={i} size={16} className="stroke-yellow-500 fill-white" />
            ))}
          </div>
          {currentStatusKey === "EN_COURS" && (
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {livre.progression}%
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
        <button
          onClick={() => onEditClick(livre)}
          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40"
          title="Modifier"
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={() => onStatusClick(livre)}
          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40"
          title="Changer le statut"
        >
          <BookCheck size={20} />
        </button>

        <button
          onClick={() => onDeleteClick(livre)}
          className="p-2 rounded-full bg-red-500/50 text-white hover:bg-red-600"
          title="Supprimer"
        >
          <Trash2 size={20} />
        </button>

        <button
          onClick={() => onViewClick(livre)}
          className="p-2 rounded-full bg-blue-500/50 text-white hover:bg-blue-600"
          title="Voir les détails"
        >
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
}
