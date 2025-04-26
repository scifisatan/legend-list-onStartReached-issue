import { Stack } from "expo-router";
import { colors } from "@/constants/colors";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Infinite Chat History",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.foreground },
          statusBarBackgroundColor: colors.background,
          statusBarStyle: "inverted",
        }}
      />
    </Stack>
  );
}
