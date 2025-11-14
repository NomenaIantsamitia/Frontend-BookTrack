"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, User, Calendar, Star } from "lucide-react";
import { Livre } from "@/app/utils/livreUtils";

interface LivreDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  livre: Livre | null;
}

export default function LivreDetailModal({
  isOpen,
  onClose,
  livre,
}: LivreDetailModalProps) {
  if (!livre) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "A_LIRE":
        return "bg-yellow-500";
      case "EN_COURS":
        return "bg-indigo-500";
      case "TERMINE":
        return "bg-emerald-500";
      default:
        return "bg-gray-400";
    }
  };

  const averageRating =
    livre.avis && livre.avis.length > 0
      ? (
          livre.avis.reduce((sum, a) => sum + (a.note || 0), 0) / livre.avis.length
        ).toFixed(1)
      : "–";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Conteneur principal du modal */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* En-tête */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                Détails du livre
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={22} />
              </button>
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col md:flex-row p-6 gap-6">
              {/* Couverture */}
              <div className="flex-shrink-0 w-full md:w-1/3">
                <img
                  src={livre.couvertureUrl || "/placeholder-book.jpg"}
                  alt={livre.titre}
                  className="rounded-xl w-full h-72 object-cover shadow-md"
                />
              </div>

              {/* Informations du livre */}
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {livre.titre}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" /> {livre.auteur}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  {livre.datePublication
                    ? new Date(livre.datePublication).toLocaleDateString()
                    : "Date inconnue"}
                </p>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${getStatusColor(
                      livre.statut
                    )}`}
                  >
                    {livre.statut.replace("_", " ")}
                  </span>

                  <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                    <Star size={16} fill="currentColor" /> {averageRating}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {livre.description || "Aucune description disponible."}
                  </p>
                </div>

                {livre.totalPages && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                      <div
                        className="bg-indigo-500 h-3 rounded-full transition-all"
                        style={{
                          width: `${livre.progression ?? 0}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                      {livre.pagesLues ?? 0} / {livre.totalPages} pages (
                      {livre.progression ?? 0}%)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Avis */}
            {livre.avis && livre.avis.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Avis des lecteurs
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {livre.avis.map((avis, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl shadow-sm"
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                        “{avis.contenu || "Pas de commentaire"}”
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{avis.utilisateur?.nom}</span>
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Star size={12} fill="currentColor" /> {avis.note ?? "–"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
