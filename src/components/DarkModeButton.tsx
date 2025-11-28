import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

type Theme = "light" | "dark";

const DarkModeButton = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Check initial theme on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = (): void => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100 dark:hover:bg-gray-900"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <FaMoon size="1.5em" /> : <FaSun size="1.5em" />}
    </button>
  );
};

export default DarkModeButton;
