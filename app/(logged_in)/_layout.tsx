import { Gabarito_400Regular, useFonts } from "@expo-google-fonts/gabarito";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Gabarito_400Regular, Inter_400Regular });

  if (fontsLoaded) {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }} />
      </>
    );
  } else return <ScrollView contentContainerStyle={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <ActivityIndicator size={'large'} />
    </View>
  </ScrollView>;
}
