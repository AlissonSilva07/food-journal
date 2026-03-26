import {
    createStaticNavigation,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { verifyInstallation } from "nativewind";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import HomeScreen from "./screens/HomeScreen";

type RootStackType = typeof RootStack;

declare module "@react-navigation/core" {
  interface RootNavigator extends RootStackType {}
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: require("./assets/fonts/BricolageGrotesque.ttf"),
    Geist: require("./assets/fonts/Geist.ttf"),
  });

  verifyInstallation();
  const scheme = useColorScheme();
  const isDarkTheme = scheme === "dark";

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider className="flex-1">
      <Navigation theme={isDarkTheme ? DarkTheme : DefaultTheme} />
    </SafeAreaProvider>
  );
}
