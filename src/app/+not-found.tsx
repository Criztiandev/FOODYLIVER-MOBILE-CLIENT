import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  const handlePrevNavigation = () => {
    const isCanGoback = router.canGoBack();

    if (isCanGoback) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <YStack className="space-y-4 justify-center items-center w-full p-4">
        <Text className="text-3xl font-bold text-primary">
          Opps.. Not Found!
        </Text>
        <Image
          source={require("@/assets/images/not-found-img.png")}
          className="w-full h-[200px] "
        />
        <Button className="w-[200px]" onPress={handlePrevNavigation}>
          <Text className="font-bold text-white text-lg">Back</Text>
        </Button>
      </YStack>
    </View>
  );
}
