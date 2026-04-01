import { Paths } from "expo-file-system/next";
import * as Sharing from "expo-sharing";
import { useState } from "react";

function useShare() {
  const [isLoading, setIsLoading] = useState(false);

  const shareImage = async (image: string) => {
    setIsLoading(true);

    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on your device");
      setIsLoading(false);
      return;
    }

    try {
      const itemImageUri = `${Paths.document.uri}/${image}`;

      await Sharing.shareAsync(itemImageUri, {
        mimeType: "image/jpeg",
        dialogTitle: "Share this image!",
        UTI: "image/jpeg"
      });
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("An error occurred while trying to share the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    shareImage,
  };
}

export { useShare };
