import { imagesDummyData } from "../../assets/assets";
import "../../styles/HomePage/RightHome.css";

export function RightHome(props) {
  return (
    <section className="right-home">
      <div className="right-home-upper-wrapper">
        <article className="right-home-profile">
          <img src={props.chatUser.profilePic} alt="profile-picture" />
          <div className="right-home-profile-name-con">
            <p></p>
            <h2>{props.chatUser.fullName}</h2>
          </div>
          <p>{props.chatUser.bio}</p>
        </article>
        <hr />
        <article className="right-home-chat-media">
          <p>Media</p>
          <div className="right-home-chat-images">
            {imagesDummyData.map((image, index) => {
              if (index <= 3) {
                return <img src={image} alt="chat-image" key={index} />;
              }
              return null;
            })}
          </div>
        </article>
      </div>
      <div className="right-home-lower-wrapper">
        <button className="right-home-logout">Logout</button>
      </div>
    </section>
  );
}
