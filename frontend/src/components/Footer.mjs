import { useState, useEffect } from "react";

const themes = [
  { id: "theme1", name: "Light Beige" },
  { id: "theme2", name: "Sky Blue" },
  { id: "theme3", name: "Soft Pink" },
  { id: "theme4", name: "Mint Green" },
  { id: "theme5", name: "Warm Yellow" },
  { id: "theme6", name: "Lavender" },
  { id: "theme7", name: "Pale Cream" },
];

export default function Footer() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme1");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <footer className="footer">
      <div className="theme-selector">
        <label htmlFor="theme">Theme: </label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <p>© 2025 Person App</p>
    </footer>
  );
}
