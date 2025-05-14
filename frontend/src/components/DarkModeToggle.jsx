import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-800" />
      )}
    </button>
  );
}
