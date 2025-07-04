import { createContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  async function signUp(userData) {
    try {
      const response = await fetch("/api/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        toast.error(
          "Failed to sign up. Please check your details and try again."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while signing up. Please try again.");
    }
  }

  async function login(userData) {
    try {
      const response = await fetch("/api/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      setAuthUser(data.user);
      getOnlineUsers(data.user);

      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  }

  async function getOnlineUsers(userData) {
    if (!socket || userData) {
      const newSocket = io("http://localhost:3000", {
        query: { userId: userData._id },
      });
      setSocket(newSocket);
      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });
      console.log(onlineUsers);

      try {
      } catch (error) {
        console.log(error);
        toast.error(
          "An error occurred while fetching online users. Please try again."
        );
      }
    }
  }

  async function showUser() {
    try {
      if (!authUser || !socket) {
        const response = await fetch("/api/api/user/show", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        setAuthUser(data.user);

        getOnlineUsers(data.user);
      }
    } catch (error) {}
  }

  async function logout() {
    try {
      const response = await fetch("/api/api/user/logout");
      if (response.ok) {
        setAuthUser(null);
        setOnlineUsers({});
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
        toast.success("Logged out successfully.");
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while logging out. Please try again.");
    }
  }

  async function updateUserInfo(userData) {
    try {
      const response = await fetch("/api/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        setAuthUser(data.user);
        toast.success("User info updated successfully.");
      } else {
        toast.error("Failed to update user info. Pleas try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred while updating user info. Please try again."
      );
    }
  }

  async function updateUserProfilePic(file) {
    try {
      const response = await fetch("/api/api/user/update", {
        method: "PATCH",
        body: file,
      });
      if (response.ok) {
        const data = await response.json();
        setAuthUser(data.user);
        toast.success("Profile picture updated successfully.");
      } else {
        toast.error("Failed to update profile picture. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred while updating profile picture. Please try again."
      );
    }
  }

  const value = {
    signUp,
    login,
    onlineUsers,
    authUser,
    socket,
    logout,
    updateUserInfo,
    updateUserProfilePic,
    showUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
