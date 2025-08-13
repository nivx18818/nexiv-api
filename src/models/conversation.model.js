module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      tableName: "conversations",
    }
  );

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, {
      as: "messages",
      onDelete: "CASCADE",
      foreignKey: {
        name: "conversationId",
        allowNull: false,
      },
    });
  };

  return Conversation;
};
