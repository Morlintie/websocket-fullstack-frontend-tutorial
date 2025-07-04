import { imagesDummyData } from "../../assets/assets";
import "../../styles/HomePage/RightHome.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { MessageContext } from "../../../contexts/MessageContext";
import assets from "../../assets/assets";

export function RightHome() {
  const { authUser, logout } = useContext(AuthContext);
  const { chatUser, messages } = useContext(MessageContext);
  return (
    <section className="right-home">
      <div className="right-home-upper-wrapper">
        <article className="right-home-profile">
          <img
            src={chatUser.profilePic || assets.avatar_icon}
            alt="profile-picture"
          />
          <div className="right-home-profile-name-con">
            <p></p>
            <h2>{chatUser.fullName}</h2>
          </div>
          <p>{chatUser.bio}</p>
        </article>
        <hr />
        <article className="right-home-chat-media">
          <p>MEDIA</p>
          <div className="right-home-chat-images">
            {messages.map((message, index) => {
              return message.image ? (
                <img src={message.image} alt="chat-image" key={index} />
              ) : (
                <></>
              );
            })}
          </div>
        </article>
      </div>
      <div className="right-home-lower-wrapper">
        <button onClick={logout} className="right-home-logout">
          Logout
        </button>
      </div>
    </section>
  );
}
