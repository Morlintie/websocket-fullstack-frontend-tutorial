import assets from "../../assets/assets";
import "../../styles/HomePage/LeftHome.css";
import { userDummyData } from "../../assets/assets";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function LeftHome(props) {
  function renderUserList() {
    return userDummyData.map((user, index) => {
      return (
        <div
          onClick={() => {
            props.setChatUser({
              _id: user._id,
              fullName: user.fullName,
              profilePic: user.profilePic,
              bio: user.bio,
              email: user.email,
            });
          }}
          key={crypto.randomUUID()}
          className="left-user-profile "
        >
          <img src={user.profilePic} alt="profile-picture" />
          <div>
            <h3>{user.fullName}</h3>
            <p className="left-user-online">Online</p>
          </div>
        </div>
      );
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
        />
      </article>
      <article className="left-user">{renderUserList()}</article>
    </section>
  );
}
