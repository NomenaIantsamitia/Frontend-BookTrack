// components/dashboard/ReadingCard.tsx
import { BookOpen } from "lucide-react";

interface ReadingCardProps {
  title: string;
  author: string;
  progress: number;
  onClick?: () => void;
}

export const ReadingCard = ({ title, author, progress, onClick }: ReadingCardProps) => (
  <div 
    className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center gap-4 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-transparent hover:border-indigo-200 dark:hover:border-gray-600"
    onClick={onClick}
  >
    <div className="w-12 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-md flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
      <BookOpen size={20} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold truncate text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{author}</p>
      <div className="mt-2 text-xs">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-indigo-600 dark:text-indigo-400">Progression</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div 
            className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);