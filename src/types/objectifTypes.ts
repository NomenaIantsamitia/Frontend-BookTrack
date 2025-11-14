// types/objectif.ts
export interface Objectif {
  id: string;
  titre: string;
  description?: string;
  type: TypeObjectif;
  valeurCible: number;
  valeurActuelle: number;
  dateDebut: string;
  dateFin: string;
  statut: StatutObjectif;
  progressionPourcentage: number;
  utilisateurId: string;
  createdAt: string;
  updatedAt: string;
}

export enum TypeObjectif {
  LIVRES_LUS = 'LIVRES_LUS',
  PAGES_LUES = 'PAGES_LUES',
  STREAK_JOURS = 'STREAK_JOURS',
  TEMPS_LECTURE = 'TEMPS_LECTURE',
  GENRE_DECOUVERTE = 'GENRE_DECOUVERTE',
  AUTEURS_DECOUVERT = 'AUTEURS_DECOUVERT',
  SERIE_COMPLETE = 'SERIE_COMPLETE'
}

export enum StatutObjectif {
  ACTIF = 'ACTIF',
  TERMINE = 'TERMINE',
  ANNULE = 'ANNULE',
  EN_RETARD = 'EN_RETARD'
}

export interface Statistiques {
  total: number;
  actifs: number;
  termines: number;
  enRetard: number;
  annules: number;
  objectifsProches: number;
  objectifsEnRetardAutomatique: number;
  progressionMoyenne: number;
}