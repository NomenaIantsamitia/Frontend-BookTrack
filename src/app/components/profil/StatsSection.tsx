// components/profile/StatsSection.tsx
import { BookOpen, BookA, Star, CalendarCheck, BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";
import { UserStats } from "@/types/profile";

interface StatsSectionProps {
  stats: UserStats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  const statCards = [
    {
      icon: <BookOpen size={24} />,
      value: stats.livresLus,
      label: "Livres Lus",
      color: "text-indigo-600"
    },
    {
      icon: <BookA size={24} />,
      value: stats.pagesLues,
      label: "Pages Lues",
      color: "text-green-600"
    },
    {
      icon: <Star size={24} />,
      value: stats.moyenneNotes.toFixed(1),
      label: "Note Moyenne",
      color: "text-yellow-600"
    },
    {
      icon: <CalendarCheck size={24} />,
      value: stats.joursStreak,
      label: "Jours de Streak",
      color: "text-red-600"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart3 size={20} className="text-indigo-600"/> Votre Progression Globale
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};