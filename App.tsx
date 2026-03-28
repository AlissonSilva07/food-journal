import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./screens/Navigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: require("./assets/fonts/BricolageGrotesque.ttf"),
    GeistRegular: require("./assets/fonts/Geist-Regular.ttf"),
    GeistBold: require("./assets/fonts/Geist-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider className="flex-1">
      <Navigation />
    </SafeAreaProvider>
  );
}
