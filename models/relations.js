const Application = require("./application.model")
const Chat = require("./chat.model")
const Message = require("./message.model")

// relation between application and chat is many to one  
Application.hasMany(Chat , {foreignKey : "application_id" , onDelete : "cascade" , onUpdate:"cascade"})
Chat.belongsTo(Application , {foreignKey : "application_id"})

// relation between chat and message is many to one  
Chat.hasMany(Message , {foreignKey : "chat_id" , onDelete : "cascade" , onUpdate:"cascade"})
Message.belongsTo(Chat , {foreignKey : "chat_id"})











