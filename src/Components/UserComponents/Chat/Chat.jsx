import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userChats } from "../../../api/chatApi";
import Chatbox from "./Chatbox";
import { io } from "socket.io-client";
import ChatList from "./ChatList";

const END_POINT = "http://localhost:3001/";
let socket;
const Chat = () => {
  const { _id } = useSelector((state) => state.userReducer.user);
  const userId = _id;
  // console.log(userId,"kokoo")

  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  // console.log(messages,"ppppppppp");

  useEffect(() => {
    userChats(userId).then((res) => {
      setConversations(res?.data);
    });
  }, []);
  // console.log(conversations, "ooooo")

  useEffect(() => {
    socket = io(END_POINT);
  }, []);

  useEffect(() => {
    socket?.emit("setup", userId);
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      if (data?.chatId === currentChat?._id) {
        const message = [...messages, data];
        setMessages(message);
      }

      const updatedConversations = conversations.map((chat) => {
        if (chat._id === data.chatId) {
          return { ...chat, lastMessage: Date.parse(data.createdAt) };
        }
        return chat;
      });

      const sortedConversations = [...updatedConversations].sort((a, b) => {
        const aTimestamp = a.lastMessage || 0;
        const bTimestamp = b.lastMessage || 0;
        return bTimestamp - aTimestamp;
      });

      setConversations(sortedConversations);
    });
  }, [messages, currentChat, conversations]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div>
      <div className="pt-5">
        <div>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2 bg-gray-200 rounded-xl">
              <div
                className="bg-gray-200 flex flex-col overflow-auto rounded-t-xl"
                style={{ maxHeight: "85vh" }}
              >
              
                {/* <!-- end search compt -->
                 <!-- user list --> */}
                <div className="pt-5">
                  <div className="cursor-pointer">
                    {conversations?.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => {
                          setCurrentChat(chat);
                          socket?.emit("join room", chat._id);
                        }}
                      >
                        <ChatList
                          data={chat}
                          currentUserId={userId}
                          online={checkOnlineStatus(chat)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-9/12 mx-2 h-full">
              <div className="bg-slate-200 shadow-sm rounded-xl md:p-1">
                <div className="flex flex-wrap justify-end font-semibold text-gray-900">
                  <div
                    className="flex-1 p:2 sm:p-6 justify-center flex flex-col"
                    style={{ minHeight: "85vh" }}
                  >
                    <Chatbox
                      chat={currentChat}
                      currentUser={userId}
                      setMessages={setMessages}
                      messages={messages}
                      socket={socket}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
