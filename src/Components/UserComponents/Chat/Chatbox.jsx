import Conversation from "./Conversation";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { getOwner } from "../../../api/chatApi";
import { addMessage, getMessages } from "../../../api/messageApi";
import InputEmoji from "react-input-emoji";


const ChatBox = ({ chat, currentUser, setMessages,messages,socket }) => {
  const [ownerData, setOwnerData] = useState(null);

  const [newMessage, setNewMessage] = useState("");
  
  const scroll = useRef();

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //fetching data for the header of the chat box

  useEffect(() => {
    const ownerId = chat?.members?.find((id) => id !== currentUser);
    const getOwnerData = async () => {
      try {
        const { data } = await getOwner(ownerId);
        setOwnerData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) getOwnerData();
  }, [chat, currentUser]);

  //fetching data for messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        // console.log(data,"chat histories from chatbox")
        setMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    if(newMessage.length>0){
      let newOne
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    // console.log(message, "from messageeeeopopopop")
    try {
      const { data } = await addMessage(message);
      newOne = data
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
    }
    socket.emit('send_message',newOne)
    }
    
  };
  console.log(messages,"from messagesiii");

 
  return (
    <>
      {chat ? (
        <>
          <div
            className="flex-1 p:2 justify-center flex flex-col"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex sm:items-center justify-between  border-b-2 border-gray-200 pb-3">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src="/userLogo.png"
                    alt="UserProfile"
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {ownerData?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 h-screen scrolling-touch "
            >
              {messages?.map((message) => (
                <div ref={scroll} key={message._id}>
                  <Conversation message={message} currentUser={currentUser} />
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>
                </span>
                <InputEmoji value={newMessage} onChange={handleChange} />

                <button
                  type="button"
                  onClick={handleSend}
                  className="inline-flex items-center justify-center rounded-full px-4 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 ml-1 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex-1 p:2 sm:p-6 justify-center flex items-center text-gray-300"
          style={{ maxHeight: "90vh", fontSize: "50px" }}
        >
          Open a chat to start a conversation
        </div>
      )}
    </>
  );
};

export default ChatBox;
