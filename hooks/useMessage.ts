import { useState } from "react";
import { Message } from "@/types/message";
import { messages as dummyMessages } from "@/constants/data";

const NETWORK_DELAY_MS = 1000;
const MESSAGES_TO_FETCH = 10;

const sortMessagesByTime = (messages: Message[]) => {
  return [...messages].sort(
    (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
  );
};

export const useMessages = () => {
  const [messages, setMessages] = useState(sortMessagesByTime(dummyMessages));
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadOlderMessages = async () => {
    console.log("message loading");
    setIsLoadingMore(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));

      const earliestTimestamp = new Date(
        messages[0]?.sent_at || Date.now()
      ).getTime();

      const olderMessages: Message[] = Array.from(
        { length: MESSAGES_TO_FETCH },
        (_, i) => ({
          text: `Previous message ${messages.length + i + 1}`,
          sent_by_you: Boolean(i % 2),
          sent_at: new Date(earliestTimestamp - (i + 1) * 60000).toISOString(),
        })
      );

      setMessages((prevMessages) =>
        sortMessagesByTime([...olderMessages, ...prevMessages])
      );
    } catch (error) {
      console.error("Error loading older messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const sendMessage = (newMessage: string) => {
    if (!newMessage.trim()) return;
    const newMsg = {
      text: newMessage,
      sent_by_you: true,
      sent_at: new Date().toISOString(),
    };
    setMessages((prevMessages) =>
      sortMessagesByTime([...prevMessages, newMsg])
    );
  };

  return {
    messages,
    sendMessage,
    loadOlderMessages,
    isLoadingMore,
  };
};
