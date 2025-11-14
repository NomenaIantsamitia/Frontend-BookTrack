// types/profile.ts
export interface User {
    id: string;
    nom: string;
    email: string;
    dateCree: string;
    avatarUrl: string;
  }
  
  export interface UserStats {
    livresLus: number;
    pagesLues: number;
    moyenneNotes: number;
    joursStreak: number;
  }
  
  export interface Objectif {
    id: string;
    titre: string;
    type: string;
    progression: number;
    statut: string;
  }
  
  export interface Avis {
    id: string;
    livre: string;
    note: number;
    date: string;
  }
  
  export interface UserData {
    utilisateur: User;
    stats: UserStats;
    objectifsRecents: Objectif[];
    derniersAvis: Avis[];
  }
  
  export interface StatCardProps {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    color: string;
  }