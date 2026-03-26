import React from "react";
import { ScrollView, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className={`flex-1 pt-${insets.top} pb-${insets.bottom}`}>
      <ScrollView className="flex-1">
        <Text className="font-bricolageGrotesque text-2xl text-white">
          HomeScreen
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
