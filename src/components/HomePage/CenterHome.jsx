import assets from "../../assets/assets";
import { messagesDummyData } from "../../assets/assets";
import "../../styles/HomePage/CenterHome.css";
import { messageTime } from "../../lib/messageTime";
import { useRef, useContext, useState } from "react";
import { MessageContext } from "../../../contexts/MessageContext";
import { AuthContext } from "../../../contexts/AuthContext";
export function CenterHome() {
  const { sendMessage, sendImageMessage, chatUser, messages } =
    useContext(MessageContext);

  const { authUser, onlineUsers } = useContext(AuthContext);
  const [messageText, setMessageText] = useState("");

  const lastMessage = useRef(null);

  if (!chatUser._id) {
    return (
      <section className="center-home-no-content">
        <img src={assets.logo_big} alt="logo" />
        <h1>everytime, everwhere</h1>
      </section>
    );
  }

  function renderMessages() {
    return messages.map((message, index) => {
      if (chatUser._id === message.senderId) {
        return (
          <div key={crypto.randomUUID()} className="message-container-foreign">
            <div className="message-profile">
              <img
                src={chatUser.profilePic || assets.avatar_icon}
                alt="profile-picture"
              />
              <p>{messageTime(message.createdAt)}</p>
            </div>
            <div
              ref={messages.length - 1 === index ? lastMessage : null}
              className="center-home-real-message-foreign"
            >
              {message.image ? (
                <img
                  className="message-img"
                  src={message.image}
                  alt="message-image"
                />
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div key={crypto.randomUUID()} className="message-container-locale">
            <div
              ref={messages.length - 1 === index ? lastMessage : null}
              className="center-home-real-message-locale"
            >
              {message.image ? (
                <img
                  className="message-img"
                  src={message.image}
                  alt="message-image"
                />
              ) : (
                <p>{message.text}</p>
              )}
            </div>
            <div className="message-profile">
              <img
                src={authUser.profilePic || assets.avatar_icon}
                alt="profile-picture"
              />
              <p>{messageTime(message.createdAt)}</p>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <section className="center-home">
      <article className="center-home-header">
        <div className="center-home-header-profile">
          <img
            src={chatUser.profilePic || assets.avatar_icon}
            alt="profile-picture"
          />
          <h2>{chatUser.fullName}</h2>
          <p
            className={
              Object.keys(onlineUsers).includes(chatUser._id)
                ? "online-status-dot"
                : "offline-status-dot"
            }
          ></p>
        </div>
        <figure className="center-home-header-info-figure">
          <img
            className="center-home-header-info"
            src={assets.help_icon}
            alt="help-icon"
          />
        </figure>
      </article>
      <hr />
      <article className="center-home-message">{renderMessages()}</article>
      <article className="center-home-text">
        <input
          placeholder="Type something"
          className="center-home-text-input"
          type="message"
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          onClick={(e) => {
            if (e.key === "Enter") {
              sendMessage(messageText);
              setMessageText("");
            }
          }}
        />
        <input
          id="text-image"
          name="image"
          className="center-home-text-image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            sendImageMessage(e.target.files[0]);
          }}
        />
        <label className="center-home-image-upload" htmlFor="text-image">
          <img src={assets.gallery_icon} alt="gallery" />
        </label>
        <button className="center-home-text-submit">
          <img
            onClick={() => {
              sendMessage(messageText);
              setMessageText("");
            }}
            src={assets.send_button}
            alt="send"
          />
        </button>
      </article>
    </section>
  );
}
