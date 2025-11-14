import React from "react";

interface AuthHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthHeader({ icon, title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <div className="mx-auto h-10 w-10 text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}
