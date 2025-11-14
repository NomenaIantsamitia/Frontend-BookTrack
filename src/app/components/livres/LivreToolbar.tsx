"use client";

import { Filter, Grid3X3, List, Plus, Search } from "lucide-react";

interface LivreToolbarProps {
  filter: string;
  setFilter: (val: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddClick: () => void;
}

export default function LivreToolbar({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onAddClick,
}: LivreToolbarProps) {
  const filters = [
    { label: "Tout", value: "all" },
    { label: "En cours", value: "EN_COURS" },
    { label: "Terminé", value: "TERMINE" },
    { label: "À lire", value: "A_LIRE" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-l-4 border-indigo-500">
      <div className="flex-1 relative">
      <input
  type="text"
  placeholder="Rechercher un livre (Titre ou Auteur)..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
    searchQuery ? "border-indigo-500" : ""
  }`}
/>
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 p-2 rounded-xl bg-gray-50 dark:bg-gray-700">
        <Filter size={20} className="text-indigo-500" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 text-sm font-medium rounded-lg ${
              filter === f.value
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 ${
              viewMode === "grid"
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Grid3X3 size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 ${
              viewMode === "list"
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <List size={20} />
          </button>
        </div>

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700"
        >
          <Plus size={20} />
          Ajouter un livre
        </button>
      </div>
    </div>
  );
}
