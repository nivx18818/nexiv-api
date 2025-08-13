module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "messages",
    }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, {
      as: "conversation",
      foreignKey: {
        name: "conversationId",
        allowNull: false,
      },
    });
  };

  return Message;
};
