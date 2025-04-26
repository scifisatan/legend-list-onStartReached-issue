import { View, Text } from "react-native";
import { Message as MessageType } from "@/types/message";

const MessageBubble = ({ message }: { message: MessageType }) => {
  return (
    <View
      style={{
        alignSelf: message.sent_by_you ? "flex-end" : "flex-start",
        backgroundColor: message.sent_by_you ? "#421AF4" : "white",
        padding: 12,
        borderRadius: 16,
        maxWidth: "80%",
        borderBottomLeftRadius: message.sent_by_you ? 16 : 4,
        borderBottomRightRadius: message.sent_by_you ? 4 : 16,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        marginHorizontal: 16,
        marginVertical: 4,
      }}
    >
      <Text
        style={{
          color: message.sent_by_you ? "white" : "#000",
          fontSize: 16,
        }}
      >
        {message.text}
      </Text>
      <Text
        style={{
          color: message.sent_by_you ? "#e0e0e0" : "#666",
          fontSize: 12,
          marginTop: 4,
        }}
      >
        {new Date(message.sent_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

export default MessageBubble;
