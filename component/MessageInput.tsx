import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

type MessageInputProps = {
  onSend: (message: string) => void;
};

export default function MessageInput({ onSend }: MessageInputProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSend(newMessage);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.inputBoxContainer}>
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message..."
        style={styles.inputBox}
        placeholderTextColor={colors.mutedForeground}
      />
      <Pressable
        onPress={handleSend}
        style={[
          styles.sendButton,
          !newMessage.trim() && styles.sendButtonDisabled,
        ]}
        disabled={!newMessage.trim()}
      >
        <Text
          style={[
            styles.sendButtonText,
            !newMessage.trim() && styles.sendButtonTextDisabled,
          ]}
        >
          Send
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    padding: 16,
    backgroundColor: colors.background,
    flexDirection: "row",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.muted,
  },
  inputBox: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    fontSize: 16,
    color: colors.secondaryForeground,
  },
  sendButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.muted,
  },
  sendButtonText: {
    color: colors.primaryForeground,
    fontWeight: "600",
  },
  sendButtonTextDisabled: {
    color: colors.mutedForeground,
  },
});
