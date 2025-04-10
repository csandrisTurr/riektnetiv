import { Stack, useNavigation } from "expo-router";
import { Gabarito_400Regular, useFonts } from '@expo-google-fonts/gabarito';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useEffect } from "react";
import { UserProvider } from "@/contexts/user";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Gabarito_400Regular, Inter_400Regular });

  if (fontsLoaded) {
    return (
      <>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
      </>
    );
  } else return <ScrollView contentContainerStyle={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <ActivityIndicator size={'large'} />
    </View>
  </ScrollView>;
}
