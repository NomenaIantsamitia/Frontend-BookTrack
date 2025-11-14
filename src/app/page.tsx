"use client";

import { useState } from "react";
import { BookOpenText } from "lucide-react";
import AuthHeader from "./components/AuthHeader";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ToggleAuthLink from "./components/ToggleAuthLink";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const title = isLogin ? "Bienvenue à nouveau !" : "Créez votre compte";
  const subtitle = isLogin
    ? "Connectez-vous pour continuer votre lecture."
    : "Vérifiez votre email avant l’inscription.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
        <AuthHeader icon={<BookOpenText />} title={title} subtitle={subtitle} />

        {isLogin ? (
          <LoginForm setMessage={setMessage} />
        ) : (
          <RegisterForm
            step={step}
            setStep={setStep}
            setMessage={setMessage}
            setIsLogin={setIsLogin}
          />
        )}

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}

        <ToggleAuthLink
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setMessage={setMessage}
          setStep={setStep}
        />
      </div>
    </div>
  );
}
