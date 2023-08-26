import React, { useRef, useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import styles from "./Chat.module.css";
import { getResponse, getURL } from "./Helper";

const Chat = ({ amazon, setAmazon, ebay, setEbay }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [messages, setMessages] = useState([]);
  const textA = useRef(null);

  const sendMessage = async () => {
    try {
      let newMessages = [{ id: messages.length + 1, text, sender: "user" }];
      // get first chatgpt response, which includes general description and the list of items
      const response = getResponse(text);
      const newResponse = response.message;
      const items = response.itemList;
      // get actual urls from Amazon
      const amazonURLList = getURL("amazon", items);
      setAmazon([...amazon, amazonURLList]);
      // get actual urls from Ebay
      const ebayURLList = getURL("ebay", items);
      setEbay([...ebay, ebayURLList]);
      newMessages.push({
        id: messages.length + 2,
        newResponse,
        sender: "agent",
      });
      setMessages([...messages, ...newMessages]);
      textA.current.value = "";
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(image?.name);
  return (
    <div className={styles.chatPage}>
      <div className={styles.chatContainer}>
        <div className={styles.chatMessages}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            hidden
            id="imageMessage"
            name="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              setImage(event.currentTarget.files[0]);
            }}
          />
          {image ? (
            <div>
              {image.name.length > 20
                ? image.name.slice(0, 20) + "..."
                : image.name}
            </div>
          ) : (
            <textarea
              className={styles.messageInput}
              ref={textA}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          )}

          <button className={styles.sendButton} onClick={sendMessage}>
            Send
          </button>
          <label htmlFor="imageMessage" className={styles.imageButton}>
            Image
          </label>
        </div>
      </div>
    </div>
  );
};

export default Chat;
