import assets from "../../assets/assets";
import "../../styles/HomePage/LeftHome.css";
import { userDummyData } from "../../assets/assets";
import { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../../contexts/MessageContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

export function LeftHome() {
  const { onlineUsers } = useContext(AuthContext);
  const { sideBarUsers, getMessages, unreadMessages } =
    useContext(MessageContext);
  const [searchUser, setSearchUser] = useState("");

  let unreadMessageCount = 0;

  function checkUnreadMessages(userId) {
    for (let i = 0; i < unreadMessages.length; i++) {
      if (Object.keys(unreadMessages[i])[0] === userId) {
        unreadMessageCount = unreadMessages[i][userId];
      }
    }
  }
  function renderUserList() {
    return sideBarUsers.map((user, index) => {
      checkUnreadMessages(user._id);
      if (new RegExp(searchUser, "i").test(user.fullName)) {
        return (
          <div
            onClick={() => {
              getMessages(user);
            }}
            key={crypto.randomUUID()}
            className="left-user-profile "
          >
            <img
              src={user.profilePic || assets.avatar_icon}
              alt="profile-picture"
            />
            <div>
              <h3>{user.fullName}</h3>
              <p
                className={
                  Object.keys(onlineUsers).includes(user._id)
                    ? "left-user-online"
                    : "left-user-offline"
                }
              >
                {Object.keys(onlineUsers).includes(user._id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
            {unreadMessageCount > 0 ? (
              <div className="unreadMessageBox">{unreadMessageCount}</div>
            ) : (
              <></>
            )}
          </div>
        );
      }
    });
  }

  return (
    <section className="left-home">
      <article className="left-home-header">
        <img className="left-home-small-logo" src={assets.logo} alt="logo" />
        <div className="left-home-menu-wrapper">
          <figure className="left-home-menu-figure">
            <img
              className="left-home-menu"
              src={assets.menu_icon}
              alt="menu-icon"
            />
          </figure>
          <div className="left-home-menu-router">
            <Link className="left-home-link" to="/profile">
              <p>Profile</p>
            </Link>
            <Link className="left-home-link" to="/login">
              <p>Login</p>
            </Link>
          </div>
        </div>
      </article>
      <article className="left-home-search">
        <input
          placeholder="Search Users"
          className="left-home-search-input"
          type="text"
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
        />
      </article>
      <article className="left-user">{renderUserList()}</article>
    </section>
  );
}
