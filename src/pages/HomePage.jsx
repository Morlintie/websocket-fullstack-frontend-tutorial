import { CenterHome } from "../components/HomePage/CenterHome";
import { LeftHome } from "../components/HomePage/LeftHome";
import { RightHome } from "../components/HomePage/RightHome";
import "../styles/HomePage/HomePage.css";
import { useContext } from "react";
import { MessageContext } from "../../contexts/MessageContext";

export function HomePage() {
  const { chatUser } = useContext(MessageContext);
  return (
    <div className="home-page-wrapper">
      <div className="home-page">
        <LeftHome />
        <CenterHome />
        {chatUser._id ? <RightHome /> : <></>}
      </div>
    </div>
  );
}
