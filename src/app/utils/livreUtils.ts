// utils/livreUtils.ts
export interface UtilisateurAvis {
  id: string;
  nom: string;
}

export interface Avis {
  id: string;
  note: number;
  contenu?: string;
  utilisateurId: string;
  utilisateur?: UtilisateurAvis; // ✅ AJOUT ICI
  dateCree?: string;
}


  
  export interface Livre {
    id: string;
    titre: string;
    auteur: string;
    description?: string;
    genre: string;
    categorie?: string;
    couvertureUrl?: string;
    datePublication?: string;
    statut: "A_LIRE" | "EN_COURS" | "TERMINE" | string;
    totalPages: number;
    pagesLues: number;
    progression: number;
    avis: Avis[];
  }
  
  export const getAverageRating = (avis?: Avis[]): number => {
    if (!avis || avis.length === 0) return 0;
    const total = avis.reduce((sum, item) => sum + item.note, 0);
    return Math.round(total / avis.length);
  };
  
  export const getCoverUrl = (url?: string): string => {
    if (!url)
      return "https://via.placeholder.com/150x200?text=Pas+de+Couverture";
    return url.startsWith("http") ? url : `http://localhost:3000${url}`;
  };
  