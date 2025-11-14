"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Trash2 } from "lucide-react";

interface DeleteLivreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titreLivre?: string;
}

export default function DeleteLivreModal({
  isOpen,
  onClose,
  onConfirm,
  titreLivre,
}: DeleteLivreModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-[90%] sm:w-[400px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <XCircle className="text-red-500 w-14 h-14" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Supprimer ce livre ?
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                Êtes-vous sûr de vouloir supprimer
                <br />
                <strong>&ldquo;{titreLivre}&rdquo;</strong> ?
                <br />
                Cette action est <strong>irréversible</strong>.
              </p>

              <div className="flex gap-3 mt-4 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Annuler
                </button>

                <button
                  onClick={onConfirm}
                  className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Trash2 size={18} /> Supprimer
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}