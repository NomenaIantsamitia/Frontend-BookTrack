"use client";

import { useState } from "react";
import api from "@/lib/axios";

interface RegisterFormProps {
  step: number;
  setStep: (step: number) => void;
  setMessage: (msg: string) => void;
  setIsLogin: (val: boolean) => void;
}

export default function RegisterForm({
  step,
  setStep,
  setMessage,
  setIsLogin,
}: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    motDePasse: "",
    codeVerification: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Étape 1 : envoyer le code
  const sendCode = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/utilisateur/send-code", { email: form.email });
      setMessage("📧 Code envoyé à votre email !");
      setStep(2);
    } catch {
      setMessage("❌ Email invalide ou erreur d’envoi.");
    } finally {
      setLoading(false);
    }
  };

  // Étape 2 : création du compte
  const register = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/utilisateur/register", form);
      setMessage("🎉 Compte créé avec succès !");
      setIsLogin(true);
      setStep(1);
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "❌ Code invalide ou erreur d’inscription."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={step === 1 ? sendCode : register}>
      {/* Champ email */}
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
          disabled={step === 2} // Empêche de changer à l’étape 2
          placeholder="votre.email@exemple.com"
          className="block w-full p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700 disabled:opacity-60"
        />
      </div>

      {step === 2 && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Code reçu par email
            </label>
            <input
              name="codeVerification"
              type="text"
              onChange={handleChange}
              required
              placeholder="Entrez le code"
              className="block w-full p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom complet
            </label>
            <input
              name="nom"
              type="text"
              onChange={handleChange}
              required
              placeholder="Votre nom"
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
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="block w-full p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(1)} // bouton pour revenir à l’étape 1
            className="text-indigo-600 hover:underline text-sm"
          >
            ← Modifier l’adresse email
          </button>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {loading
          ? "Chargement..."
          : step === 1
          ? "Envoyer le code"
          : "Créer mon compte"}
      </button>
    </form>
  );
}
