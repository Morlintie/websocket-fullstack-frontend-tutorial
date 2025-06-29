import "../styles/Profile/ProfilePage.css";
import assets from "../assets/assets";
import { useState } from "react";

export function ProfilePage() {
  const [profileForm, setProfileForm] = useState({
    name: "Martin Jhonson",
    bio: "Hi Everyone, I am using QucikChat!",
  });
  const [profileURL, setProfileURL] = useState(assets.profile_martin);

  function handleProfileChange(e) {
    setProfileForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <section className="profile">
      <div className="profile-config">
        <h1>Profile details</h1>
        <input
          onChange={(e) => {
            setProfileURL(URL.createObjectURL(e.target.files[0]));
            const form = new FormData();
            form.append("image", e.target.files[0]);
          }}
          name="image"
          accept="image/*"
          id="img"
          className="profile-img-input"
          type="file"
        />
        <label className="profile-label" htmlFor="img">
          <img src={profileURL} alt="profile-picture" />

          <span>Upload image</span>
        </label>
        <input
          value={profileForm.name}
          onChange={handleProfileChange}
          name="name"
          type="text"
        />
        <textarea
          value={profileForm.bio}
          onChange={handleProfileChange}
          name="bio"
          id=""
        ></textarea>
        <button>Save</button>
      </div>
      <img src={assets.logo_big} alt="logo" />
    </section>
  );
}
