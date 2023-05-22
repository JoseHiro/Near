const express = require('express');
const Chat = require('../model/chat');
const Message = require('../model/message');
const io = require('../socket/socket');

exports.getChat = async(req, res, next) => {
  // const chatroom = await Chat.find({})
  const loggedInUser = req.userId;
  const recieverId = req.params.recieverId;

  const chatroom = new Chat({
    members: [loggedInUser, recieverId]
  })

  if(!chatroom){
    return res.status(400).json({ message: "Cannot chat with this user"})
  }
  // await chatroom.save();
}

exports.postMessage = async(req, res, next) => {
  const senderId = req.userId;
  const { message, chatroomId } = req.body;

  const singleMessage = new Message({
    roomId: chatroomId,
    message: message,
    senderId: senderId
  })

  await singleMessage.save();
  return res.status(400).json({message: "Success"})
}
