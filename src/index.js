"use strict";
const { default: axios } = require("axios");

module.exports = {

  register({ strapi }) {},
  
  bootstrap({ strapi }) {
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        // origin: "https://react-demo-7a31.onrender.com",


        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", function (socket) {
      socket.on("join", ({ username }) => {
        console.log("user connected");
        console.log("username is ", username);
        if (username) {
          socket.join("group");
          socket.emit("welcome", {
            user: "bot",
            text: `${username}, Welcome to the group chat`,
            userData: username,
          });
        } else {
          console.log("An error occurred");
        }
      });

      socket.on("sendMessage", async (data) => {
        const uniqueId = data.receiverUser;
        io.emit(uniqueId, {
          receiverUser: data.receiverUser
        }, (error) => {// Sending the message to the backend
          if (error) {
          }
        });

      });
    });
  },
};

const https = require('https');

exports.handler = async (event, context) => {
 const url = 'https://yoursitehere.onrender.com';

 return new Promise((resolve, reject) => {
   const req = https.get(url, (res) => {
     if (res.statusCode === 200) {
       resolve({
         statusCode: 200,
         body: 'Server pinged successfully',
       });
     } else {
       reject(
         new Error(`Server ping failed with status code: ${res.statusCode}`)
       );
     }
   });

   req.on('error', (error) => {
     reject(error);
   });

   req.end();
 });
};

