import { AppTabBar } from "@/components/ui/app-tabbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GalleryScreen from "./GalleryScreen";
import HomeScreen from "./HomeScreen";
import MenuScreen from "./MenuScreen";
import NewMealScreen from "./NewMealScreen";

export const HomeStack = createStackNavigator({
  screens: {
    Index: {
      screen: HomeScreen,
      options: {
        title: "Index",
        headerShown: false,
      },
    },
  },
  groups: {
    Modal: {
      screenOptions: {
        title: "Novo",
        headerShown: false,
        presentation: "modal",
      },
      screens: {
        NewMeal: NewMealScreen,
      },
    },
  },
});

export const RootStack = createBottomTabNavigator({
  tabBar: (props) => <AppTabBar {...props} />,
  screenOptions: {
    tabBarStyle: {
      position: "absolute",
    },
  },
  screens: {
    Home: {
      screen: HomeStack,
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

export const Navigation = createStaticNavigation(RootStack);

export type RootStackType = typeof RootStack;
export type HomeStackType = typeof HomeStack;

declare module "@react-navigation/core" {
  interface RootNavigator extends RootStackType {}
  interface HomeNavigator extends HomeStackType {}
}
