import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { Image, Pressable, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className={`flex-1 pt-${insets.top} pb-${insets.bottom}`}>
      <View className="w-full p-4 flex flex-row items-center justify-between">
        <Pressable className="p-2 items-center justify-center bg-surface rounded-full">
          <IconSymbol name="magnifyingglass" size={24} color={"white"} />
        </Pressable>
        <Image
          source={require("@/assets/images/logo-dark-minimal.png")}
          className="h-8 w-32"
          resizeMode="cover"
        />
        <Pressable className="p-2 items-center justify-center bg-surface rounded-full">
          <IconSymbol name="plus" size={24} color={"white"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
