"use strict";
const { default: axios } = require("axios");


module.exports = {
  register({ strapi }) {},

  bootstrap({ strapi }) {
    const io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: ["http://localhost:3000", "https://two025-react.onrender.com"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      // Event: User joins a group
      socket.on("join", ({ username }) => {
        console.log("User connected:", username);

        if (username) {
          socket.join("group");
          socket.emit("welcome", {
            user: "bot",
            text: `${username}, Welcome to the group chat`,
            userData: username,
          });
        } else {
          console.error("Error: Username is required to join.");
        }
      });

      // Event: Send a message
      socket.on("sendMessage", async (data) => {
        try {
          const uniqueId = data.receiverUser;
          io.emit(uniqueId, { receiverUser: data.receiverUser });
          console.log("Message sent to:", uniqueId);
        } catch (error) {
          console.error("Error handling sendMessage event:", error.message);
        }
      });

      // Event: Find location request
      socket.on("findLocationSend", async (data) => {
        console.log(` request code 1 :  recived to server `);

        try {
          const { targetUser, senderUser } = data;

          // Notify the target user to send their coordinates
          const senderUser1 = data.senderUser;
          const targetUser1 = data.targetUser;

          io.emit("findCord", { targetUser1, senderUser1 });
          console.log(` request code 2 :  send to user server ${targetUser1}`);

          // console.log(`findLocationSend: Target user ${targetUser1}, Sender user ${senderUser1}`);
        } catch (error) {
          console.error("Error handling findLocationSend event:", error.message);
        }
      });

      // Event: Target user sends coordinates
      socket.on("sendCordSend", async (data) => {


        try {
          const { senderUser1,targetUserName, lan,long } = data;
          
          console.log(` request code 3 :  recived to server : lan ${lan} ,  ${long} to  ${senderUser1} `);

          // console.log(`sendCordSend: Sender ${senderUser1}, Coordinates (${lan}, ${long})`);

          // Notify the sender user with the target user's coordinates
          io.emit("sendCordToSender", { senderUser1,targetUserName, long, lan });
          console.log(
            `sendCordSend: Sender ${senderUser1}, Coordinates (${lan}, ${long})`
          );
        } catch (error) {
          console.error("Error handling sendCordSend event:", error.message);
        }
      });

      socket.on("UserOnline", async (data) => {
        try {
          const { userId  } = data;
          
          // console.log(` request code 3 :  recived to server : lan `);

          // console.log(`sendCordSend: Sender ${senderUser1}, Coordinates (${lan}, ${long})`);

          // Notify the sender user with the target user's coordinates
          io.emit("UserOnline", { userId });
          // console.log(
          //   // `sendCordSend: Sender ${senderUser1}, Coordinates (${lan}, ${long})`
          // );
        } catch (error) {
          console.error("Error handling sendCordSend event:", error.message);
        }
      });
      



    });
  },
};
