const { Message } = require("@/models");

exports.getMessagesByConversation = async (conversationId, maxMessages = 10) => {
  const messages = await Message.findAll({
    attributes: ["role", "content"],
    where: { conversationId },
    limit: maxMessages,
  });
  return messages;
};

exports.create = async (data) => {
  const newMessage = await Message.create(data);
  return newMessage;
};

exports.deleteByConversation = async (conversationId) => {
  const deletedCount = await Message.destroy({
    where: { conversationId },
  });
  return deletedCount > 0;
};
