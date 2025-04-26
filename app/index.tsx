import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list";
import { useHeaderHeight } from "@react-navigation/elements";

import Loading from "@/component/Loading";
import MessageBubble from "@/component/MessageBubble";
import MessageInput from "@/component/MessageInput";
import { colors } from "@/constants/colors";
import { Message as MessageType } from "@/types/message";
import { useMessages } from "@/hooks/useMessage";

export default function MessageScreen() {
  const { messages, sendMessage, loadOlderMessages, isLoadingMore } =
    useMessages();
  const headerHeight = Platform.OS === "ios" ? useHeaderHeight() : 0;

  const handleStartReached = () => {
    if (!isLoadingMore) {
      loadOlderMessages();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        contentContainerStyle={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <View style={styles.listContainer}>
          <LegendList<MessageType>
            data={messages}
            ListHeaderComponent={<Loading isLoading={isLoadingMore} />}
            keyExtractor={(item, index) => `${item.sent_at}-${index}`}
            onStartReachedThreshold={0.1}
            onStartReached={handleStartReached}
            alignItemsAtEnd
            maintainScrollAtEnd
            maintainVisibleContentPosition
            initialScrollIndex={messages.length - 1}
            maintainScrollAtEndThreshold={0.1}
            recycleItems
            renderItem={({ item }) => <MessageBubble message={item} />}
          />
        </View>
        <MessageInput onSend={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.muted,
  },
  keyboardAvoid: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
