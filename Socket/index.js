const io = require("socket.io")(8000);
let users = [];
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const addUser=(userId,socketId)=>{
    !users.some(user=>user.userId===userId)&&
        users.push({userId,socketId})
}
 
io.on('connection',(socket)=>{
  
    //client side will send userId 
    socket.on('addUser',(userId)=>{
        addUser(userId,socket.id);
        io.emit('getUsers',users);        
    });
      //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
      
});  