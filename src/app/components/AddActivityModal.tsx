// Fichier: app/components/AddActivityModal.tsx

import React, { useState } from 'react';
import { X, BookOpen, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

// Définition du type d'événement (à aligner avec vos données Prisma)
interface ReadingEvent {
    date: string; // Format 'YYYY-MM-DD'
    type: 'lecture' | 'termine';
    description: string;
}

interface AddActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newEvent: ReadingEvent) => void;
    initialDate: Date; // Date sélectionnée sur le calendrier
}

/**
 * Fenêtre modale pour l'ajout d'une nouvelle activité de lecture.
 */
export const AddActivityModal = ({ isOpen, onClose, onSave, initialDate }: AddActivityModalProps) => {
    
    // Convertir la date initiale au format 'YYYY-MM-DD' pour l'input
    const initialDateStr = format(initialDate, 'yyyy-MM-dd');

    const [date, setDate] = useState(initialDateStr);
    const [type, setType] = useState<'lecture' | 'termine'>('lecture');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!date || !description) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        const newEvent: ReadingEvent = {
            date,
            type,
            description,
        };
        
        // Simule l'envoi à l'API (NestJS)
        onSave(newEvent); 
        
        // Réinitialisation et fermeture
        setDescription('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transition-all transform scale-100">
                
                {/* En-tête de la Modale */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Ajouter une activité de lecture
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>
                
                {/* Corps du Formulaire */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-700 dark:text-red-300" role="alert">
                            {error}
                        </div>
                    )}
                    
                    {/* Champ Date */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date de l'activité
                        </label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                            required
                        />
                    </div>

                    {/* Champ Type */}
                    <div>
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type d'événement</span>
                        <div className="flex space-x-4">
                            <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition w-1/2 
                                ${type === 'lecture' ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30' : 'bg-white dark:bg-gray-700 dark:border-gray-600'}`}>
                                <input
                                    type="radio"
                                    name="type"
                                    value="lecture"
                                    checked={type === 'lecture'}
                                    onChange={() => setType('lecture')}
                                    className="mr-2 text-indigo-600"
                                />
                                <BookOpen size={18} className="text-indigo-600 mr-2" /> Lecture
                            </label>
                            
                            <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition w-1/2
                                ${type === 'termine' ? 'bg-green-50 border-green-500 dark:bg-green-900/30' : 'bg-white dark:bg-gray-700 dark:border-gray-600'}`}>
                                <input
                                    type="radio"
                                    name="type"
                                    value="termine"
                                    checked={type === 'termine'}
                                    onChange={() => setType('termine')}
                                    className="mr-2 text-green-600"
                                />
                                <CheckCircle size={18} className="text-green-600 mr-2" /> Livre Terminé
                            </label>
                        </div>
                    </div>

                    {/* Champ Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description de l'activité
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ex: 50 pages lues sur 'Le Petit Prince'"
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                            required
                        />
                    </div>

                    {/* Boutons d'Action */}
                    <div className="flex justify-end space-x-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Enregistrer l'activité
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};