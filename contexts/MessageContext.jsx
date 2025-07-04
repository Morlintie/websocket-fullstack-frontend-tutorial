import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const { socket, authUser } = useContext(AuthContext);
  const [sideBarUsers, setSideBarUsers] = useState([]);
  const [chatUser, setChatUser] = useState({
    _id: "",
    fullname: "",
    profilePic: "",
    bio: "",
    email: "",
  });
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  async function getUnseenMessages() {
    try {
      const response = await fetch("/api/api/messages/unread");
      if (response.ok) {
        const data = await response.json();
        setSideBarUsers(data.users);
        setUnreadMessages(data.unreadMessages);
      } else {
        toast.error("Failed to fetch unseen messages");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching unseen messages");
    }
  }

  async function getMessages(user) {
    try {
      const response = await fetch(`/api/api/messages/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        setChatUser({
          _id: user._id,
          fullName: user.fullName,
          profilePic: user.profilePic,
          bio: user.bio,
          email: user.email,
        });

        setMessages(data.messages);
        setUnreadMessages((prev) => {
          return [...prev, { [user._id]: 0 }];
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching messages");
    }
  }

  async function subscribeToMessages() {
    socket.on("newMessage", (message) => {
      if (message.senderId === chatUser._id) {
        setMessages((prev) => {
          return [...prev, message];
        });
      } else {
        setUnreadMessages((prev) => {
          const existingMessage = prev.findIndex(
            (msg) => Object.keys(msg)[0] === message.senderId
          );
          if (existingMessage !== -1) {
            return prev.map((msg, index) => {
              if (index === existingMessage) {
                return {
                  ...msg,
                  [Object.keys(msg)[0]]: msg[message.senderId] + 1,
                };
              } else {
                return msg;
              }
            });
          } else {
            return [...prev, { [message.senderId]: 1 }];
          }
        });
      }
    });
  }

  async function sendMessage(message) {
    try {
      if (!message) {
        return;
      }
      const response = await fetch(`/api/api/messages/send/${chatUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => {
          return [...prev, data.message];
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while sending the message");
    }
  }

  async function sendImageMessage(image) {
    try {
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.set("image", image);
      const response = await fetch(`/api/api/messages/send/${chatUser._id}`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => {
          return [...prev, data.message];
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while sending the image message");
    }
  }

  useEffect(() => {
    if (socket) {
      subscribeToMessages();
    }
  }, [socket, chatUser._id]);
  useEffect(() => {
    if (authUser) {
      getUnseenMessages();
    }
  }, [authUser]);

  const value = {
    sendMessage,
    sendImageMessage,
    getMessages,
    sideBarUsers,
    chatUser,
    unreadMessages,
    messages,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
