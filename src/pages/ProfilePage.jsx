import "../styles/Profile/ProfilePage.css";
import assets from "../assets/assets";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function ProfilePage() {
  const { updateUserInfo, updateUserProfilePic, authUser } =
    useContext(AuthContext);
  const [profileForm, setProfileForm] = useState({
    fullName: authUser.fullName,
    bio: authUser.bio,
  });
  const [profileURL, setProfileURL] = useState(
    authUser.profilePic || assets.avatar_icon
  );

  function handleProfileChange(e) {
    setProfileForm((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
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
            form.set("profilePic", e.target.files[0]);
            updateUserProfilePic(form);
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
          value={profileForm.fullName}
          onChange={handleProfileChange}
          name="fullName"
          type="text"
        />
        <textarea
          value={profileForm.bio}
          onChange={handleProfileChange}
          name="bio"
        ></textarea>
        <button
          onClick={(e) => {
            updateUserInfo(profileForm);
          }}
        >
          Save
        </button>
      </div>
      <img src={assets.logo_big} alt="logo" />
    </section>
  );
}
