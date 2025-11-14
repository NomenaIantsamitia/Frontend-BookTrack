// components/dashboard/StatCard.tsx
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: ReactNode;
  color: string;
}

export const StatCard = ({ title, value, unit, icon, color }: StatCardProps) => (
  <div className={`p-5 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-l-4 ${color} hover:shadow-xl transition-all duration-300`}>
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-full ${color.replace('border-l-4', 'bg-').replace('500', '500/10')}`}>
        {icon}
      </div>
      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{title}</span>
    </div>
    <div className="mt-4">
      <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{unit}</p>
    </div>
  </div>
);