import { AppButton } from "@/core/components/ui/app-button";
import { AppText } from "@/core/components/ui/app-text";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MealInfoTabProps {
  key: number;
  imageUri: {
    value: string | null;
    setValue: React.Dispatch<React.SetStateAction<string | null>>;
  };
  onContinue: () => void;
}

const screenHeight = Dimensions.get("screen").height;

export default function MealCameraTab({
  key,
  imageUri,
  onContinue,
}: MealInfoTabProps) {
  const insets = useSafeAreaInsets();
  const [facing, setFacing] = useState<CameraType>("back");
  const [torchOn, setTorchon] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const background = useThemeColor({}, "background");
  const textPrimary = useThemeColor({}, "text");
  const primary = useThemeColor({}, "primary");
  const onPrimary = useThemeColor({}, "onPrimary");
  const inverseBackground = useThemeColor({}, "inverseBackground");
  const outline = useThemeColor({}, "outline");
  const cameraButtonRing = useThemeColor({}, "cameraButtonRing");
  const surface = useThemeColor({}, "surface");

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: false,
          shutterSound: false,
        });
        imageUri.setValue(photo.uri);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (e) {
        console.error("Capture failed", e);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const resetCamera = () => {
    imageUri.setValue(null);
  };

  const pickImage = (uri: string) => {
    if (!uri) return;
    imageUri.setValue(uri);
    onContinue();
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!permission) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: background,
          },
        ]}
        key={key}
      >
        <ActivityIndicator color={primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: background,
          },
        ]}
        key={key}
      >
        <View style={styles.notGrantedBody}>
          <IconSymbol
            name="exclamationmark.bubble.fill"
            size={42}
            color={inverseBackground}
          />
          <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
            Atenção
          </AppText>
          <AppText fontColor={textPrimary}>
            Precisamos da sua permissão para acessar a câmera.
          </AppText>
          <Pressable
            style={[styles.button, { backgroundColor: primary }]}
            onPress={requestPermission}
          >
            <AppText fontColor={onPrimary} bold>
              Conceder permissão
            </AppText>
          </Pressable>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCameraFlash() {
    setTorchon((prev) => !prev);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          paddingBottom: insets.bottom + 32,
        },
      ]}
      key={key}
    >
      <View style={styles.body}>
        <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
          Câmera
        </AppText>
        {!imageUri.value && isReady ? (
          <View style={[styles.camera, { height: screenHeight / 1.8 , borderColor: outline }]}>
            <CameraView
              ref={cameraRef}
              style={{
                flex: 1,
              }}
              facing={facing}
              enableTorch={torchOn}
              onCameraReady={() => console.log("Hardware ready")}
            />
          </View>
        ) : (
          <View style={[styles.camera, { height: screenHeight / 1.8, borderColor: outline }]}>
            <Image source={{ uri: imageUri.value! }} style={{ flex: 1 }} />
          </View>
        )}
        {!imageUri.value ? (
          <View style={styles.cameraButtonsContainer}>
            <Pressable
              style={[
                styles.cameraToolButton,
                {
                  backgroundColor: surface,
                },
              ]}
              onPress={toggleCameraFlash}
            >
              <IconSymbol
                name={torchOn ? "flashlight.on.fill" : "flashlight.slash"}
                size={32}
                color={textPrimary}
              />
            </Pressable>
            <Pressable
              style={[
                styles.cameraButton,
                {
                  backgroundColor: "white",
                  borderWidth: 8,
                  borderColor: cameraButtonRing,
                },
              ]}
              onPress={takePicture}
            >
              <IconSymbol name="camera.aperture" size={24} color="black" />
            </Pressable>
            <Pressable
              style={[
                styles.cameraToolButton,
                {
                  backgroundColor: surface,
                },
              ]}
              onPress={toggleCameraFacing}
            >
              <IconSymbol name="repeat" size={32} color={textPrimary} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <AppButton
              title="Escolher foto"
              onPress={() => pickImage(imageUri.value!)}
            />
            <AppButton
              title="Tentar novamente"
              variant="muted"
              onPress={resetCamera}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImage: {
    height: 42,
    width: 200,
    resizeMode: "contain",
  },
  notGrantedBody: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  body: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    gap: 16,
  },
  button: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  camera: {
    position: "relative",
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  toggleFacingButton: {
    width: 42,
    height: 42,
    position: "absolute",
    right: 8,
    bottom: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  cameraButton: {
    width: 128,
    height: 64,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraToolButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  cameraButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
