const ai = require("@/config/ai");
const { Conversation } = require("@/models");
const messageService = require("@/services/message.service");

const MAX_TOKENS_CONTEXT = 4000;

exports.getById = async (id) => {
  const conversation = await Conversation.findOne({
    where: { id },
  });
  return conversation;
};

exports.summarize = async (conversationId, messages) => {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash-lite",
    history: messages,
  });

  const summaryPrompt =
    'Summarize the above conversation in under 100 words. Start with "Summary:" and do not include any other text.';
  const response = await chat.sendMessage(summaryPrompt);
  const summary = response.text();

  await messageService.deleteByConversation(conversationId);
  await messageService.create({
    conversationId,
    role: "model",
    content: summary,
  });

  return summary;
};

exports.getContext = async (conversationId) => {
  const messages = await messageService.getMessagesByConversation(conversationId);
  const context = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));
  const { totalTokens } = await ai.models.countTokens({
    model: "gemini-2.0-flash-lite",
    contents: context,
  });

  if (totalTokens > MAX_TOKENS_CONTEXT) {
    const summary = await this.summarize(conversationId, messages);
    return [
      {
        role: "model",
        parts: [{ text: summary }],
      },
    ];
  }

  return context;
};
