const asyncHandler = require("@/utils/async-handler.util");
const chatService = require("@/services/chat.service");

exports.sendMessage = asyncHandler(async (req, res) => {
  const newMessages = await chatService.sendMessage(req.params.id, req.body.message);
  return res.success(200, newMessages);
});
