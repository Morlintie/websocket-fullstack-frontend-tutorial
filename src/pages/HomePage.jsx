import { CenterHome } from "../components/HomePage/CenterHome";
import { LeftHome } from "../components/HomePage/LeftHome";
import { RightHome } from "../components/HomePage/RightHome";
import "../styles/HomePage/HomePage.css";

export function HomePage() {
  return (
    <div className="home-page-wrapper">
      <div className="home-page">
        <LeftHome />
        <CenterHome />
        <RightHome />
      </div>
    </div>
  );
}
