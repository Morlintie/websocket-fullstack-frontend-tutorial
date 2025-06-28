import { CenterHome } from "../components/HomePage/CenterHome";
import { LeftHome } from "../components/HomePage/LeftHome";
import { RightHome } from "../components/HomePage/RightHome";
import "../styles/HomePage/HomePage.css";
import { useState } from "react";

export function HomePage() {
  const [chatUser, setChatUser] = useState({
    _id: "",
    fullname: "",
    profilePic: "",
    bio: "",
    email: "",
  });
  return (
    <div className="home-page-wrapper">
      <div className="home-page">
        <LeftHome setChatUser={setChatUser} />
        <CenterHome chatUser={chatUser} />
        <RightHome />
      </div>
    </div>
  );
}
