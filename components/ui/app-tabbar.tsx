import { useThemeColor } from "@/hooks/use-theme-color";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { Dimensions, StyleSheet, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { IconSymbol } from "./icon-symbol";

type AppTabBarProps = BottomTabBarProps & {
  insets: EdgeInsets;
};

const screenWidth = Dimensions.get("screen").width;

export const AppTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: AppTabBarProps) => {
  const { buildHref } = useLinkBuilder();
  const surface = useThemeColor({}, "surface");
  const textSecondary = useThemeColor({}, "textSecondary");
  const background = useThemeColor({}, "background");
  const inverseBackground = useThemeColor({}, "inverseBackground");

  return (
    <View
      style={[
        styles.blurView,
        {
          bottom: insets.bottom + 16,
          marginHorizontal: screenWidth / 8,
          backgroundColor: surface,
        },
      ]}
    >
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title;

          const isFocused = state.index === index;

          const getIcon = (label: string | undefined) => {
            if (label === "Home") {
              return (
                <IconSymbol
                  name="house.fill"
                  size={24}
                  color={isFocused ? background : textSecondary}
                />
              );
            } else if (label === "Gallery") {
              return (
                <IconSymbol
                  name="camera.fill"
                  size={24}
                  color={isFocused ? background : textSecondary}
                />
              );
            } else {
              return (
                <IconSymbol
                  name="gear"
                  size={24}
                  color={isFocused ? background : textSecondary}
                />
              );
            }
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabbarItem,
                {
                  backgroundColor: isFocused
                    ? inverseBackground
                    : "transparent",
                },
              ]}
            >
              {getIcon(label)}
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: 100,
    overflow: "hidden",
  },
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderRadius: 100,
    gap: 8,
  },
  tabbarItem: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 100,
  },
});
