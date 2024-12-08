import { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function useLoadFont() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Poppins-Regular": Poppins_400Regular,
          "Poppins-Medium": Poppins_500Medium,
          "Poppins-SemiBold": Poppins_600SemiBold,
          "Poppins-Bold": Poppins_700Bold,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
