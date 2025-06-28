import assets from "../../assets/assets";
import { messagesDummyData } from "../../assets/assets";
import "../../styles/HomePage/CenterHome.css";
import { messageTime } from "../../lib/messageTime";
import { useRef, useEffect } from "react";
export function CenterHome(props) {
  const lastMessage = useRef(null);

  useEffect(() => {
    if (lastMessage.current) {
      setTimeout(() => {
        lastMessage.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messagesDummyData]);
  if (!props?.chatUser._id) {
    return (
      <section className="center-home-no-content">
        <img src={assets.logo_big} alt="logo" />
        <h1>everytime, everwhere</h1>
      </section>
    );
  }
  function renderMessages() {
    return messagesDummyData.map((message, index) => {
      if (props.chatUser._id === message.senderId) {
        return (
          <div key={crypto.randomUUID()} className="message-container-foreign">
            <div className="message-profile">
              <img src={props.chatUser.profilePic} alt="profile-picture" />
              <p>{messageTime(message.createdAt)}</p>
            </div>
            <div
              ref={messagesDummyData.length - 1 === index ? lastMessage : null}
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
              ref={messagesDummyData.length - 1 === index ? lastMessage : null}
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
              <img src={assets.avatar_icon} alt="profile-picture" />
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
          <img src={props.chatUser.profilePic} alt="profile-picture" />
          <h2>{props.chatUser.fullName}</h2>
          <p></p>
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
      <article className="center-home-message">
        <div className="message-container-foreign">
          <div className="message-profile">
            <img src={assets.profile_martin} alt="profile-picture" />
            <p>12.23</p>
          </div>
          <div className="center-home-real-message-foreign">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            debitis doloremque modi itaque iste repellendus?
          </div>
        </div>
        <div className="message-container-locale">
          <div className="center-home-real-message-locale">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            debitis doloremque modi itaque iste repellendus?
          </div>
          <div className="message-profile">
            <img src={assets.avatar_icon} alt="profile-picture" />
            <p>12.24</p>
          </div>
        </div>
        {renderMessages()}
      </article>
      <article className="center-home-text">
        <input
          placeholder="Type something"
          className="center-home-text-input"
          type="text"
        />
        <input
          id="text-image"
          name="image"
          className="center-home-text-image"
          type="file"
        />
        <label className="center-home-image-upload" htmlFor="text-image">
          <img src={assets.gallery_icon} alt="gallery" />
        </label>
        <button className="center-home-text-submit">
          <img src={assets.send_button} alt="send" />
        </button>
      </article>
    </section>
  );
}
