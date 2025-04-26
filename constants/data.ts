import { Message } from "@/types/message";

const messages: Message[] = Array.from({ length: 20 }, (_, j) => ({
  text:
    j % 2 === 0
      ? `Hello! This is Message ${j + 1}`
      : `This is a reply message ${j + 1}`,
  sent_by_you: j % 2 === 0 ? false : true,
  sent_at: new Date(Date.now() - j * 3600000 - j * 600000).toISOString(),
}));

export { messages };
