import { useTheme } from "next-themes";

export const useCurrentTheme = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const currentTheme = theme === "dark" || theme === "light" ? theme : systemTheme;
  
  return { theme: currentTheme, setTheme };
};