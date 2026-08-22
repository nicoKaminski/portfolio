import { THEME_STORAGE_KEY } from "./types";

export const themeInitScript = `(function() {
  try {
    var storedTheme = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', storedTheme);
      return;
    }
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var initialTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();`;
