import OwnerChatList from "./OwnerChatList";
import { useSelector } from "react-redux";
import { useState } from "react";
import OwnerChatBox from "./OwnerChatBox";
import { userChats } from "../../../api/chatApi";
import { useEffect } from "react";
import { io } from "socket.io-client";

const END_POINT = "http://localhost:3001/";
let socket;

const OwnerChat = () => {
  const { _id } = useSelector((state) => state.ownerReducer.owner);
  const ownerId = _id;
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    userChats(ownerId).then((res) => {
      setConversations(res?.data);
    });
  }, []);

  useEffect(() => {
    socket = io(END_POINT);
  }, []);

  useEffect(() => {
    socket?.emit("setup", ownerId);
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [ownerId]);

  useEffect(() => {
    socket?.on("recieve_message", (data) => {
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
    const chatMember = chat.members.find((member) => member !== ownerId);
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
                className="bg-gray-200 rounded-xl flex flex-col overflow-auto"
                style={{ maxHeight: "85vh" }}
              >
                
                {/* <!-- end search compt -->
                 <!-- user list --> */}
                <div className="pt-3">
                  <div className="cursor-pointer">
                    {conversations?.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => {
                          setCurrentChat(chat);
                          socket?.emit("join room", chat._id);
                        }}
                      >
                        <OwnerChatList
                          data={chat}
                          currentUserId={ownerId}
                          online={checkOnlineStatus(chat)}
                          
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-full">
              <div className="bg-gray-200 shadow-sm rounded-sm md:p-1 rounded-xl">
                <div className="flex flex-wrap justify-end font-semibold text-gray-900">
                  <div
                    className="flex-1 p:2 sm:p-6 justify-center flex flex-col"
                    style={{ minHeight: "85vh" }}
                  >
                    <OwnerChatBox
                      chat={currentChat}
                      currentUser={ownerId}
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

export default OwnerChat;
