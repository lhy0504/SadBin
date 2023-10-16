import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// default values are useless
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { console.log(1) } });

export const ThemeProvider = ({ children }) => {
  const autoTheme = useColorScheme() ?? 'light'; // always changing
  const [theme, setTheme] = useState(autoTheme); // light|auto|dark

  const getThemeFromStorage = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme != 'auto') {
        setTheme(savedTheme);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    getThemeFromStorage();
  }, []);

  const toggleTheme = (newTheme) => {
    AsyncStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  };

  return (
    <ThemeContext.Provider value={{
      theme: theme == 'auto' ? autoTheme : theme,
      toggleTheme: toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;