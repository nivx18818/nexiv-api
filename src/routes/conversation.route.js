const express = require("express");
const router = express.Router();

const { Message } = require("@/models");

const conversationController = require("@/controllers/conversation.controller");
const chatController = require("@/controllers/chat.controller");

router.post("/", conversationController.create);
router.get("/:id", conversationController.getById);
router.post("/:id", chatController.sendMessage);

module.exports = {
  subRouter: router,
  include: {
    model: Message,
    as: "messages",
    excludes: ["updatedAt"],
  },
};
