import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useContext, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { AppDarkTheme, AppLightTheme } from '../constants/Themes';
import ThemeContext, { ThemeProvider } from '../constants/ThemeContext';
import Colors from '../constants/Colors';
import { StatusBar } from 'react-native';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
 
  return (
  
      <ThemeProvider>
        <WrappedRootLayoutNav />
      </ThemeProvider>
    
  );
}

function WrappedRootLayoutNav() {
  const { theme:colorScheme, toggleTheme } = useContext(ThemeContext);
  const colors = Colors[colorScheme??'light'];
  return (
    <PaperProvider>
      <StatusBar translucent={false}
        backgroundColor={colors.background}
      barStyle={colorScheme=='dark'?'light-content':'dark-content'}/>
      {/*   <ThemeProvider value={colorScheme === 'dark' ? AppDarkTheme : AppLightTheme}> */}
     
        <Stack >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="write" options={{ headerShown: false }} />
          <Stack.Screen name="dragToBin" options={{ headerShown: false }} />
          <Stack.Screen name="bin" options={{ headerShown: false }} />
          <Stack.Screen name="askAI" options={{ headerShown: false }} />
          <Stack.Screen name="history" options={{
            title: 'History',
            headerTintColor: colors.text,
           
            headerStyle: {
              backgroundColor: colors.deepbackground
            },
          }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
     
    </PaperProvider>
  );
}
