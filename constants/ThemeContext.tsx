import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// default values are useless
const ThemeContext = createContext({theme:'light',toggleTheme:()=>{console.log(1)}});

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(useColorScheme() ?? 'dark');

  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    getTheme();
  }, []);

  const toggleTheme = () => {
    let newTheme =(theme== 'light') ? 'dark' : 'light';
    console.log(newTheme)
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme)
  };

  return (
    <ThemeContext.Provider value={{theme:theme, toggleTheme:toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;