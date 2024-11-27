import { useEffect, useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";

const useSplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const checkSplashStatus = async () => {
      const splashShown = await getItem("splash");

      if (splashShown === "true") {
        setShowSplash(false);
      }
      setIsLoading(false);
    };

    checkSplashStatus();
  }, []);

  const handleSplash = (value: boolean) => {
    setShowSplash(value);
  };

  return { isLoading, showSplash, handleSplash };
};

export default useSplashScreen;
