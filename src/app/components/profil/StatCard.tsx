// components/profile/StatCard.tsx
import { StatCardProps } from "@/types/profile";

export const StatCard = ({ icon, value, label, color }: StatCardProps) => (
  <div className="p-4 bg-gray-50 rounded-xl flex items-center space-x-3 hover:shadow-md">
    <div className={`p-3 rounded-full bg-opacity-10 ${color.replace("text", "bg")}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs font-medium text-gray-500">{label}</p>
    </div>
  </div>
);