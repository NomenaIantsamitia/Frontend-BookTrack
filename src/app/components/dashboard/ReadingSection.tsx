// components/dashboard/ReadingSection.tsx
import Link from "next/link";
import { ReadingCard } from "./ReadingCard";
import { Clock, TrendingUp, BookOpen } from "lucide-react";

interface ReadingBook {
  id: string;
  titre: string;
  auteur: string;
  progression: number;
}

interface ReadingSectionProps {
  readingList: ReadingBook[];
}

export const ReadingSection = ({ readingList }: ReadingSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" /> 
          Lectures en cours
          <span className="px-2 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
            {readingList.length}
          </span>
        </h2>
        <Link 
          href="/livres" 
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors flex items-center gap-1"
        >
          Voir tout <TrendingUp size={16} />
        </Link>
      </div>
      
      <div className="space-y-4">
        {readingList.length > 0 ? (
          readingList.map((book) => (
            <ReadingCard 
              key={book.id}
              title={book.titre}
              author={book.auteur}
              progress={book.progression}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">Aucune lecture en cours</p>
            <Link 
              href="/livres" 
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-sm font-medium"
            >
              Commencer une nouvelle lecture →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};