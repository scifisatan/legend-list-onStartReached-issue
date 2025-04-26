import { ActivityIndicator, View, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

export default function Loading({
  style,
  isLoading,
}: {
  style?: ViewStyle;
  isLoading: boolean;
}) {
  return (
    <View style={[style, styles.loading]}>
      {isLoading && (
        <ActivityIndicator size="large" color={colors.foreground} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
