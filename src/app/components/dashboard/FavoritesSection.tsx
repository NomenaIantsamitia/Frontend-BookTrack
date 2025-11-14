// components/dashboard/FavoritesSection.tsx
import { Star } from "lucide-react";

interface FavoriteBook {
  id: string;
  titre: string;
  auteur: string;
  note: number;
}

interface FavoritesSectionProps {
  recentFavorites: FavoriteBook[];
}

export const FavoritesSection = ({ recentFavorites }: FavoritesSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-yellow-500" /> 
        Livres Favoris Récents
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentFavorites.length > 0 ? (
          recentFavorites.map((book) => (
            <div 
              key={book.id} 
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
            >
              <p className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                {book.titre}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{book.auteur}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < book.note ? "fill-current" : "text-gray-300"} 
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-6">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Aucun livre favori récent</p>
          </div>
        )}
      </div>
    </section>
  );
};