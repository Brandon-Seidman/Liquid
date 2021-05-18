import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';
import "./Chat.css";

const Chat = () => {
  const dispatch = useDispatch();
  const { yourID, messages, message } = useSelector(state => state.chat);

  const socketRef = useRef();

  useEffect(() => {
    dispatch(actions.clearMessages());
    dispatch(actions.setMessage(""));

    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      dispatch(actions.setYourID(id));
    })

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message) {
    dispatch(actions.addMessage(message));
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    dispatch(actions.setMessage(""));
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    dispatch(actions.setMessage(e.target.value));
  }

  return (
    <div className = "page">
      <div className = "chat">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <div className = "mym" key={index}>
                <div className = "message">
                  {message.body}
                </div>
              </div>
            )
          }
          return (
            <div className = "om" key={index}>
              <div className = "omessage">
                {message.body}
              </div>
            </div>
          )
        })}
      </div>
      <form className = "f" onSubmit={sendMessage}>
        <textarea className="texta" value={message} onChange={handleChange} placeholder="Say Something... Like whats your favorite drink?" />
        <button className = "b">Send Message</button>
      </form>
    </div>
  );
};

export default Chat;
