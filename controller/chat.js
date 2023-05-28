const express = require('express');
const Chat = require('../model/chat');
const Message = require('../model/message');
const User = require('../model/user');
const io = require('../socket/socket');

exports.getChat = async(req, res, next) => {
  const loggedInUser = req.userId;
  const recieverId = req.params.recieverId;

  const chatroom = await Chat.find({$and: [{ members: loggedInUser }, { members:  recieverId } ]});

  if(chatroom.length < 1){
    let newChatroom = new Chat({
      members: [loggedInUser, recieverId]
    })
    await newChatroom.save();
    return res.status(200).json({ message: "New chat", chat: [], chatroomId: newChatroom._id.toString()})
  }

  let messages = await Message.find({roomId: chatroom[0]._id.toString()})
  messages = messages.map(data => {
    let isSender;

    if(data.senderId === loggedInUser){
      isSender = true;
    }else{
      isSender = false;
    }
    return {message: data.message, time: data.createdAt, sender: isSender};
  })

  return res.status(200).json({ message: 'Found all the chat messages', chat: messages, chatroomId: chatroom[0]._id.toString()});
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

exports.chatMembers = async (req, res, next) => {
  // const chatMember = await Chat.find({members: req.userId}).populate('members.user',['name']).exec()
  let chatMember = await Chat.find({members: {$eq : req.userId }})
  .populate("members", "name");

  if(chatMember.length === 0) return res.status(200).json({message: 'Found chat list', chatMember: []})

  chatMember = chatMember.map(list => {
    let data = {}
    data.chatId = list._id;

    list.members.forEach(member => {
      if(req.userId !== member._id.toString()){
        data.memberId = member._id;
        data.name = member.name;
      };
    })
    return data;
  })

  return res.status(200).json({message: 'Found chat list', chatMember})
}
