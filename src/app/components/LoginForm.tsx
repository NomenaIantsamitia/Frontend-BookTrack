"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import api from "@/lib/axios";

interface LoginFormProps {
  setMessage: (msg: string) => void;
}

interface LoginFormData {
  email: string;
  motDePasse: string;
}

export default function LoginForm({ setMessage }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LoginFormData>({ email: "", motDePasse: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.utilisateur));
      setMessage("✅ Connexion réussie !");

      router.push("/dashboard");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            required
            placeholder="exemple@gmail.com"
            className="block w-full pl-10 p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mot de passe
        </label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <input
            name="motDePasse"
            type="password"
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="block w-full pl-10 p-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {loading ? "Chargement..." : "Se connecter"}
      </button>
    </form>
  );
}