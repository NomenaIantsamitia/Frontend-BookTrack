// components/dashboard/StatsSection.tsx
import { StatCard } from "./StatCard";
import { BookCheck, BookOpen, BookA, Star } from "lucide-react";

interface StatsData {
  livresLusCetteAnnee: number;
  livresEnCours: number;
  totalPagesLues: number;
  moyenneNote: number;
}

interface StatsSectionProps {
  stats: StatsData | null;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  if (!stats) return null;

  const formattedStats = [
    { 
      title: "Livres Lus", 
      value: stats.livresLusCetteAnnee.toString(), 
      unit: "Cette année", 
      icon: <BookCheck className="w-6 h-6 text-green-500" />, 
      color: "border-green-500" 
    },
    { 
      title: "En Cours", 
      value: stats.livresEnCours.toString(), 
      unit: "Titres actifs", 
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />, 
      color: "border-indigo-500" 
    },
    { 
      title: "Total Pages", 
      value: stats.totalPagesLues.toLocaleString(), 
      unit: "Lues au total", 
      icon: <BookA className="w-6 h-6 text-yellow-500" />, 
      color: "border-yellow-500" 
    },
    { 
      title: "Moyenne Note", 
      value: stats.moyenneNote.toFixed(1), 
      unit: "/ 5.0", 
      icon: <Star className="w-6 h-6 text-red-500" />, 
      color: "border-red-500" 
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {formattedStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </section>
  );
};