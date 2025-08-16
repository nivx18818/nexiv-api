const { Type } = require("@google/genai");
const ai = require("@/config/ai");
const prompts = require("@/config/prompts");
const conversationService = require("@/services/conversation.service");
const messageService = require("@/services/message.service");

exports.detectIntent = async (context) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: context,
    config: {
      systemInstruction: prompts.intentClassification,
      temperature: 0.1,
      responseMimeType: "text/x.enum",
      responseJsonSchema: {
        type: Type.STRING,
        enum: Object.keys(prompts).filter((key) => key !== "intentClassification"),
      },
    },
  });

  return prompts[response.text];
};

exports.sendMessage = async (conversationId, message) => {
  const context = await conversationService.getContext(conversationId);
  const systemPrompt = await this.detectIntent(context);

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: context,
    config: {
      systemInstruction: systemPrompt,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  const response = systemPrompt
    ? await chat.sendMessage(message)
    : {
        text: "Sorry, I can only help with creative content or language tasks. Please ask something related to writing, editing, or language support.",
      };

  const newMessages = [
    { role: "user", content: message },
    { role: "model", content: response.text },
  ];
  return newMessages.forEach(async (msgData) => {
    const newMessage = await messageService.create({ conversationId, ...msgData });
    return newMessage;
  });
};
