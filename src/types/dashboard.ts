export interface DashboardStats {
    livresLusCetteAnnee: number;
    livresEnCours: number;
    totalPagesLues: number;
    moyenneNote: number;
  }
  
  export interface ReadingBook {
    id: string;
    titre: string;
    auteur: string;
    progression: number;
    couverture?: string;
  }
  
  export interface FavoriteBook {
    id: string;
    titre: string;
    auteur: string;
    note: number;
    dateAjout: string;
  }