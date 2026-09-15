import { useTheme } from "../context/ThemeContext";

export function useThemeHook() {
  const { isDarkMode, toggleTheme } = useTheme();

  return {
    isDarkMode,
    toggleTheme,
  };
}

export default useThemeHook;