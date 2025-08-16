const asyncHandler = require("@/utils/async-handler.util");
const conversationService = require("@/services/conversation.service");

exports.getById = asyncHandler(async (req, res) => {
  return res.success(200, req.conversation);
});

exports.create = asyncHandler(async (req, res) => {
  const newConversation = await conversationService.create();
  return res.success(200, newConversation);
});
