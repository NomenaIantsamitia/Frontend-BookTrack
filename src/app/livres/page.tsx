"use client";

import LivresPage from "../components/LivresClient";
import ProtectedRoute from "../components/ProtectedRoute";
import { Sidebar } from "../components/Sidebar";


export default function Livres() {
  return (
    <ProtectedRoute>
    <div className="flex">
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>
      <LivresPage />
    </div>
    </ProtectedRoute>
  );
}
