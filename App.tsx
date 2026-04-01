import { db } from "@/core/db/client";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppToast } from "./core/components/ui/app-toast";
import { useThemeColor } from "./core/hooks/use-theme-color";
import migrations from "./drizzle/migrations";
import { Navigation } from "./navigation/Navigator";

function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { success, error } = useMigrations(db, migrations);
  const background = useThemeColor({}, "background");

  if (error) {
    console.error("Migration error:", error);
    return <ActivityIndicator color={"white"} style={{ flex: 1 }} />;
  }

  if (!success) {
    return <ActivityIndicator color={"white"} style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: background }}>{children}</View>
  );
}

export default function App() {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: require("./assets/fonts/BricolageGrotesque.ttf"),
    GeistRegular: require("./assets/fonts/Geist-Regular.ttf"),
    GeistBold: require("./assets/fonts/Geist-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <DatabaseProvider>
        <Navigation theme={isDark ? DarkTheme : DefaultTheme} />
        <AppToast />
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}
