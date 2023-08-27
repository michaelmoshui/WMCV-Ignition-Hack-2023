import React, { useRef, useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import styles from "./Chat.module.css";
import { getResponse } from "../../helper/Helper";
import PropagateLoader from "react-spinners/PropagateLoader";

const Chat = ({ amazon, setAmazon }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const textA = useRef(null);

  const sendMessage = async () => {
    try {
      setLoading(true);
      let newMessages = [
        { id: messages.length + 1, text: text, sender: "user" },
      ];
      // get first chatgpt response, which includes general description and the list of items
      console.log(text);
      const response = await getResponse(text);
      console.log(response);
      // if there are new items
      if (response.products.length > 0) {
        // change items to n x 3 format
        const items = response.products;
        let tempQue = [];
        let count = 0;
        for (let i = 0; i < items.length / 3; i++) {
          let tempKey = [];
          for (let j = 0; j < 3; j++) {
            tempKey.push(items[count]);
            count++;
          }
          tempQue.push(tempKey);
        }
        setAmazon([...amazon, tempQue]);
      }

      console.log(amazon);

      // get message
      const newResponse = response.message;
      console.log(newResponse);
      newMessages.push({
        id: messages.length + 2,
        text: newResponse,
        sender: "agent",
      });
      console.log(newMessages);
      setMessages([...messages, ...newMessages]);
      console.log("reached here");
      // textA.current.value = "";
      console.log("reached end");
      setText("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  const sendImage = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async () => {
    try {
      const success = await getResponse("restart history");
      if (success) {
        setAmazon([]);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatContainer}>
        <button className={styles.newChat} onClick={refresh}>
          New Chat
        </button>
        <div className={styles.chatMessages}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        {loading ? (
          <div className={styles.inputContainer}>
            <PropagateLoader color="#b5d8e5" />
          </div>
        ) : image ? (
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
            <div>
              {image.name.length > 20
                ? image.name.slice(0, 20) + "..."
                : image.name}
            </div>
            <button
              onClick={() => {
                setImage();
              }}
              className={styles.deleteButton}
            >
              Delete
            </button>

            <button className={styles.sendButton} onClick={sendImage}>
              Send
            </button>
            <label htmlFor="imageMessage" className={styles.imageButton}>
              Image
            </label>
          </div>
        ) : (
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
            <textarea
              className={styles.messageInput}
              ref={textA}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              className={styles.sendButton}
              onClick={() => {
                if (text.length > 0) {
                  sendMessage();
                }
              }}
            >
              Send
            </button>
            <label htmlFor="imageMessage" className={styles.imageButton}>
              Image
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
