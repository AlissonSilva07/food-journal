import { AppTabBar } from "@/core/components/ui/app-tabbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GalleryScreen from "../feature/gallery/screens/GalleryScreen";
import HomeScreen from "../feature/home/screens/HomeScreen";
import MealDetailsScreen from "../feature/home/screens/MealDetailsScreen";
import MenuScreen from "../feature/menu/screen/MenuScreen";
import NewMealScreen from "../feature/home/screens/NewMealScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const HomeStack = createNativeStackNavigator({
  screens: {
    Index: {
      screen: HomeScreen,
      options: {
        title: "Index",
        headerShown: false,
      },
    },
    MealDetails: {
      screen: MealDetailsScreen,
      options: {
        title: "Details",
        headerShown: false,
      },
      linking: {
        path: "meal/:id",
      },
    },
  },
  groups: {
    Modal: {
      screenOptions: {
        presentation: "modal",
        headerShown: false,
      },
      screens: {
        New: NewMealScreen,
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

export type HomeStackParamList = {
  Index: undefined;
  New: undefined;
  MealDetails: { id: number };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Gallery: undefined;
  Menu: undefined;
};

declare module "@react-navigation/core" {
  interface RootNavigator extends RootStackType {}
}
