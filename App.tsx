import { db } from "@/core/db/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppToast } from "./core/components/ui/app-toast";
import migrations from "./drizzle/migrations";
import { Navigation } from "./screens/Navigator";

function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.error("Migration error:", error);
    return <ActivityIndicator color={"white"} style={{ flex: 1 }} />;
  }

  if (!success) {
    return <ActivityIndicator color={"white"} style={{ flex: 1 }} />;
  }

  return <>{children}</>;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: require("./assets/fonts/BricolageGrotesque.ttf"),
    GeistRegular: require("./assets/fonts/Geist-Regular.ttf"),
    GeistBold: require("./assets/fonts/Geist-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <DatabaseProvider>
      <SafeAreaProvider className="flex-1">
        <Navigation />
        <AppToast />
      </SafeAreaProvider>
    </DatabaseProvider>
  );
}
