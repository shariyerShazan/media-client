import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import useGetReceiverSet from '../hooks/useGetReceiverSet'
import { LuSendHorizontal } from 'react-icons/lu'
import axios from 'axios'
import { MESSAGE_API_END_POINT } from '../utils/apiEndPoints'
import { setMessages } from '../redux/message.slice'

function MessageSwap() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { receiver, messages } = useSelector((store) => store.message);
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  useGetReceiverSet(id);

  useEffect(() => {
    if (!receiver?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${MESSAGE_API_END_POINT}/get-message/${receiver._id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setMessages(res.data.messages)); 
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [receiver]);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(
        `${MESSAGE_API_END_POINT}/send-message/${receiver._id}`,
        { message: newMessage },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.message]));
        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!receiver) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        <p>Start conversation</p>
      </div>
    );
  }

  return (
    <div className="h-[80vh] flex flex-col justify-between border-2 border-favone/70 rounded-md">
      {/*  Receiver info */}
      <div className="border-b p-3 flex items-center gap-3 shadow-md sticky top-0 bg-white z-10">
        <img
          src={receiver?.profilePicture || "https://i.ibb.co/DYjvWTS/no-avatar.png"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
       <div className='flex flex-col'>
       <Link to={`/profile/${receiver._id}`} className="font-bold  hover:text-green-500 text-lg">{receiver?.email} </Link>
       <h2 className="font-bold text-favone text-sm">{receiver?.fullName}</h2>
       </div>
      </div>

      {/* Chat bubble section */}
      <div className="flex-1 overflow-y-auto space-y-4 px-4 py-3">
        {messages?.map((msg, index) => {
          const isSentByUser = msg?.senderId === user._id;

          return (
            <div key={index} className={`chat ${isSentByUser ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={isSentByUser ? user?.profilePicture : receiver?.profilePicture}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="chat-header">
                {isSentByUser ? user?.fullName : receiver?.fullName}
              </div>
              <div className="chat-bubble">{msg.message}</div>
            </div>
          );
        })}
        <div ref={bottomRef}></div> {/* Scroll anchor */}
      </div>

      {/*  Message input box */}
      <form onSubmit={handleMessage} className="relative mt-3 px-4 pb-4">
        <input
          type="text"
          name="message"
          placeholder="Write a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border-b border-favone/70 outline-none pr-10"
        />
        <button
          type="submit"
          className="absolute right-7 bottom-6 text-gray-600 hover:text-black"
        >
          <LuSendHorizontal className="cursor-pointer" size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageSwap;
