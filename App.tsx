import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppTabBar } from "./components/ui/app-tabbar";
import GalleryScreen from "./screens/GalleryScreen";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";

type RootStackType = typeof RootStack;

declare module "@react-navigation/core" {
  interface RootNavigator extends RootStackType {}
}

const RootStack = createBottomTabNavigator({
  tabBar: (props) => <AppTabBar {...props} />,
  screenOptions: {
    tabBarStyle: {
      position: "absolute",
    },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    Gallery: {
      screen: GalleryScreen,
      options: {
        title: "Gallery",
        headerShown: false,
      },
    },
    Menu: {
      screen: MenuScreen,
      options: {
        title: "Menu",
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

  const scheme = useColorScheme();
  const isDarkTheme = scheme === "dark";

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider className="flex-1">
      <Navigation theme={isDarkTheme ? DarkTheme : DefaultTheme} />
    </SafeAreaProvider>
  );
}
