"use client";

import { useState } from "react";
import api from "@/lib/axios";

interface RegisterFormProps {
  setMessage: (msg: string) => void;
  setIsLogin: (val: boolean) => void;
}

interface RegisterFormData {
  nom: string;
  email: string;
  motDePasse: string;
}

export default function RegisterForm({ setMessage, setIsLogin }: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterFormData>({
    nom: "",
    email: "",
    motDePasse: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/utilisateur/inscription", form);
      setMessage("🎉 Compte créé avec succès !");
      setIsLogin(true);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Erreur d'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nom complet
        </label>
        <input
          name="nom"
          type="text"
          value={form.nom}
          onChange={handleChange}
          required
          placeholder="Votre nom complet"
          className="block w-full p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="votre.email@exemple.com"
          className="block w-full p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mot de passe
        </label>
        <input
          name="motDePasse"
          type="password"
          value={form.motDePasse}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="block w-full p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {loading ? "Chargement..." : "Créer mon compte"}
      </button>
    </form>
  );
}
