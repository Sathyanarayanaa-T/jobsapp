import { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const lightTheme = {
    background: '#f8f9fa', // Naukri off-white background
    surface: '#ffffff',
    primary: '#275df5',    // Naukri style blue
    success: '#1ea676',
    text: '#121224',
    textSecondary: '#717b9e',
    border: '#e4e7ee',
    card: '#ffffff',
    tabBar: '#ffffff',
    tabBarActive: '#275df5',
    tabBarInactive: '#828ba2',
    isDark: false,
};

export const darkTheme = {
    background: '#121224',
    surface: '#1c1c38',
    primary: '#5c85ff',
    success: '#23c58d',
    text: '#ffffff',
    textSecondary: '#a0aabf',
    border: '#2a2a47',
    card: '#1c1c38',
    tabBar: '#1c1c38',
    tabBarActive: '#5c85ff',
    tabBarInactive: '#828ba2',
    isDark: true,
};

export function ThemeProvider({ children }) {
    const systemColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
