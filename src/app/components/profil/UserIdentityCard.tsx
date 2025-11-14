// components/profile/UserIdentityCard.tsx
import { Mail } from "lucide-react";
import { User } from "@/types/profile";

interface UserIdentityCardProps {
  user: User;
}

export const UserIdentityCard = ({ user }: UserIdentityCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
    <div className="flex flex-col items-center">
      <img 
        src={user.avatarUrl || "/default-avatar.png"} 
        alt="Avatar" 
        className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-200"
      />
      <h2 className="text-2xl font-bold text-gray-800">{user.nom}</h2>
      <p className="text-sm text-gray-500 flex items-center gap-1">
        <Mail size={16} /> {user.email}
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Membre depuis le: {new Date(user.dateCree).toLocaleDateString()}
      </p>
    </div>
  </div>
);